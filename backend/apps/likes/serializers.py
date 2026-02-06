from rest_framework import serializers
from . import models
class LikedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LikedItem
        fields = ['id', 'user', 'content_type', 'object_id']
        read_only_fields = ['user']