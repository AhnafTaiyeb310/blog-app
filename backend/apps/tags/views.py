from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from . import models
from . import serializers
class TagViewset(ModelViewSet):
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer

class TaggedItemViewSet(ModelViewSet):
    queryset = models.TaggedItem.objects.all()
    serializer_class = serializers.TaggedItemSerializer