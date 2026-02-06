from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from . import models
from . import serializers

# Create your views here.
class LikedItemViewSet(ModelViewSet):
    queryset = models.LikedItem.objects.all()
    serializer_class = serializers.LikedItemSerializer

    def perform_create(self, serializer):
        return serializer.save(user= self.request.user)

    