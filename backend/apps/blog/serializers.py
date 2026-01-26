from rest_framework import serializers
from django.db import models
from rest_framework.fields import ReadOnlyField
from django.forms import ValidationError
from . import models


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PostImages
        fields = ['id', 'image']

    def create(self, validated_data):
        post_id = self.context['post_id']
        return models.PostImages.objects.create(post_id= post_id,**validated_data)

class PostSerializer(serializers.ModelSerializer):
    category_display = serializers.StringRelatedField(source='category')
    category = serializers.PrimaryKeyRelatedField(
        queryset = models.Category.objects.all(),
        write_only = True,
        allow_null=True,
        required= False,
        )
    images = PostImageSerializer(many=True, read_only=True)
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = models.Post
        fields = ['id','title', 'slug', 'content', 'excerpt', 'author', 'status','category','category_display', 'visibility', 'scheduled_for','images']
        read_only_fields = ('published_at', 'created_at', 'updated_at', 'author')

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ['id', 'title', 'slug', 'parent']

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True) # for getting and author string not pk

    class Meta:
        model = models.Comment
        fields = ['id', 'content','author','guest_name','guest_email','post','parent','status', 'created_at','updated_at']
        read_only_fields = ('created_at', 'updated_at','status','post')
    
    def validate(self, attrs):
        request = self.context.get('request')

        if not request.user.is_authenticated:
            if not attrs.get('guest_name') and not attrs.get('guest_email'):
                raise serializers.ValidationError("Guest name and email are required for anonymous comments.")
        return attrs
    # def create(self, validated_data):
    #     post_id = self.context['post_id']
    #     return models.Comment.objects.create(post_id= post_id, **validated_data)
    
class ProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = models.Profile
        fields = ['id', 'user_id', 'bio', 'birth_date', 'is_verified']


