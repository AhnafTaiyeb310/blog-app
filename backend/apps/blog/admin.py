from django.contrib import admin
from .  import models

@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id','title', 'category','created_at']
    list_editable = ['category']
    search_fields = ['id__startswith', 'title__istartswith']
    autocomplete_fields = ['category']
    prepopulated_fields = {
        'slug': ['title']
    }
    list_per_page = 10

@admin.register(models.Comment)
class CommentsAdmin(admin.ModelAdmin):
    list_display = ['id', 'status', 'created_at']
    list_editable = ['status',]
    search_fields = ['id__startswith']

@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']
    list_editable = ['title']
    search_fields = ['title__istartswith']

@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'user__first_name','user__last_name', 'is_verified', 'user__id']
    list_select_related = ['user']
    autocomplete_fields = ['user']