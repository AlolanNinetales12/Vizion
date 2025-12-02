from django.conf import settings
from django.db import models


class Project(models.Model):
	owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="projects")
	name = models.CharField(max_length=200)
	description = models.TextField(blank=True)
	data_file = models.FileField(upload_to="project_files/", blank=True, null=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ["-updated_at", "-created_at"]

	def __str__(self):
		return f"{self.name} ({self.owner.username})"
