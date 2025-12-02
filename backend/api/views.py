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
	permission_classes = [permissions.IsAuthenticated]

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
