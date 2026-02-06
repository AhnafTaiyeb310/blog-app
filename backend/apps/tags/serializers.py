from rest_framework import serializers
from . import models

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Tag
        fields = ['id', 'label']

class TaggedItemSerializer(serializers.ModelSerializer):
    tag_label = serializers.CharField(source='tag.label', read_only=True)
    class Meta:
        model= models.TaggedItem
        fields = ['id', 'tag', 'tag_label', 'content_type', 'object_id']