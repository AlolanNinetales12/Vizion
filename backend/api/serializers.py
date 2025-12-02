from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Project
        fields = ["id", "owner", "name", "description", "data_file", "created_at", "updated_at"]
