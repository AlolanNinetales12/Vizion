from django.contrib import admin

# Register your models here.
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
	list_display = ("name", "owner", "created_at", "updated_at")
	search_fields = ("name", "owner__username")
	readonly_fields = ("created_at", "updated_at")
