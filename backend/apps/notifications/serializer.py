from rest_framework import serializers
from . import models

class NotificationSerializer(serializers.ModelSerializer):
    content_type = serializers.CharField(source='content_type.model', read_only=True)
    object_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = models.Notifications
        fields = ['id', 'message', 'read', 'created_at', 'content_type', 'object_id']