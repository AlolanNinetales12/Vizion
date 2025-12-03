from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .forms import RegisterForm, ProjectForm
from .models import Project
from .serializers import ProjectSerializer


def register_view(request):
	if request.method == "POST":
		form = RegisterForm(request.POST)
		if form.is_valid():
			user = form.save()
			login(request, user)
			return redirect("api:projects")
	else:
		form = RegisterForm()
	return render(request, "api/register.html", {"form": form})


@login_required
def projects_list(request):
	projects = Project.objects.filter(owner=request.user)
	return render(request, "api/projects_list.html", {"projects": projects})


@login_required
def project_create(request):
	if request.method == "POST":
		form = ProjectForm(request.POST, request.FILES)
		if form.is_valid():
			project = form.save(commit=False)
			project.owner = request.user
			project.save()
			return redirect("api:projects")
	else:
		form = ProjectForm()
	return render(request, "api/project_form.html", {"form": form})


@login_required
def project_edit(request, pk):
	project = get_object_or_404(Project, pk=pk, owner=request.user)
	if request.method == "POST":
		form = ProjectForm(request.POST, request.FILES, instance=project)
		if form.is_valid():
			form.save()
			return redirect("api:projects")
	else:
		form = ProjectForm(instance=project)
	return render(request, "api/project_form.html", {"form": form, "project": project})


@login_required
def project_delete(request, pk):
	project = get_object_or_404(Project, pk=pk, owner=request.user)
	if request.method == "POST":
		project.delete()
		return redirect("api:projects")
	return render(request, "api/project_delete.html", {"project": project})


@login_required
def project_detail(request, pk):
	project = get_object_or_404(Project, pk=pk, owner=request.user)
	return render(request, "api/project_detail.html", {"project": project})


# -- API views (DRF) --


class ProjectViewSet(viewsets.ModelViewSet):
	queryset = Project.objects.all()
	serializer_class = ProjectSerializer
	# allow read-only access for unauthenticated users (they'll get an empty list),
	# but require authentication for create/update/delete
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	def get_queryset(self):
		# only allow users to see their own projects
		return Project.objects.filter(owner=self.request.user)

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)

	@action(detail=True, methods=["get"])
	def download(self, request, pk=None):
		project = self.get_object()
		if not project.data_file:
			return Response({"detail": "No file"}, status=404)
		return Response({"file_url": project.data_file.url})

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


@api_view(["GET", "PATCH"])
@permission_classes([IsAuthenticated])
def account_view(request):
	user = request.user
	if request.method == "GET":
		return Response({
			"username": user.username,
			"email": user.email,
			"first_name": user.first_name,
			"last_name": user.last_name,
		})

	# PATCH - update profile fields
	if request.method == "PATCH":
		data = request.data
		user.email = data.get("email", user.email)
		user.first_name = data.get("first_name", user.first_name)
		user.last_name = data.get("last_name", user.last_name)
		user.save()
		return Response({"detail": "updated"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
	user = request.user
	old = request.data.get("old_password")
	new = request.data.get("new_password")
	if not user.check_password(old):
		return Response({"detail": "incorrect current password"}, status=status.HTTP_400_BAD_REQUEST)
	if not new or len(new) < 8:
		return Response({"detail": "new password too short"}, status=status.HTTP_400_BAD_REQUEST)
	user.set_password(new)
	user.save()
	return Response({"detail": "password changed"})


def auth_status(request):
	# Lightweight endpoint to check whether user is authenticated (for frontend)
	from django.http import JsonResponse

	user = request.user
	return JsonResponse({
		"authenticated": user.is_authenticated,
		"username": user.username if user.is_authenticated else None,
	})
