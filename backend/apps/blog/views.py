from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin, CreateModelMixin, RetrieveModelMixin, ListModelMixin
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
from django.db import models
from . import models
from . import serializers
from . import filters

# Create your views here.
class PostModelViewset(ModelViewSet):
    queryset = models.Post.objects.select_related('category').prefetch_related('images').all()
    serializer_class = serializers.PostSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = filters.PostFilter

    def perform_create(self, serializer):
        serializer.save(author= self.request.user)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]





class CategoriesModelViewset(ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategoriesSerializer


class CommentsModelViewset(ModelViewSet):
    serializer_class = serializers.CommentSerializer

    def get_queryset(self):
        return models.Comment.objects.filter(post_id= self.kwargs['post_pk']).select_related('author', 'post')
    
    # def get_serializer_context(self):
    #     return {'post_id': self.kwargs['post_pk']}
    
    def perform_create(self, serializer):
        post_id = self.kwargs.get('post_pk')
        if self.request.user.is_authenticated:
            return serializer.save(author= self.request.user, post_id= post_id)
        else:
            return serializer.save(post_id= post_id)
    

class ProfileModelViewSet(GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

        
    @action(detail=False, methods=['GET','PUT'])
    def me(self, request):
        profile, is_created = models.Profile.objects.get_or_create(user_id= request.user.id)
        if request.method == 'GET' :
            serializer = serializers.ProfileSerializer(profile)
            return Response(serializer.data)
        elif request.method == 'PUT' :
            serializer = serializers.ProfileSerializer(profile, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

class PostImageModelViewset(ModelViewSet):
    serializer_class = serializers.PostImageSerializer

    def get_queryset(self):
        return models.PostImages.objects.filter(post_id = self.kwargs['post_pk'])
    
    def get_serializer_context(self):
        return {'post_id': self.kwargs['post_pk']} 
    
class PostDraftModelViewset(GenericViewSet, ListModelMixin):
    serializer_class = serializers.PostSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return models.Post.objects.filter(author= self.request.user, status='draft').order_by('-created_at')
        return models.Post.objects.none()