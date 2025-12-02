from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"projects-api", views.ProjectViewSet, basename="projects-api")

app_name = "api"

urlpatterns = [
    path("register/", views.register_view, name="register"),
    path("login/", auth_views.LoginView.as_view(template_name="api/login.html"), name="login"),
    path("logout/", auth_views.LogoutView.as_view(), name="logout"),

    path("projects/", views.projects_list, name="projects"),
    path("projects/new/", views.project_create, name="project_create"),
    path("projects/<int:pk>/", views.project_detail, name="project_detail"),
    path("projects/<int:pk>/edit/", views.project_edit, name="project_edit"),
    path("projects/<int:pk>/delete/", views.project_delete, name="project_delete"),
]

urlpatterns += router.urls
