from django.contrib import admin
from . import models

@admin.register(models.Tag)
class TagsAdmin(admin.ModelAdmin):
    list_display = ['id', 'label']
    list_editable = ['label']