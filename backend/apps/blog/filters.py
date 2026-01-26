from django_filters.rest_framework import FilterSet, ChoiceFilter
from django.utils import timezone
from datetime import timedelta
from . import models

class PostFilter(FilterSet):
    TIME_CHOICES = [
        ('today', 'Today'),
        ('week', 'Last 7 days'),
        ('month', 'Last 30 days'),
    ]
    timeframe = ChoiceFilter(choices=TIME_CHOICES, method = 'filter_timeframe')

    def filter_timeframe(self,queryset,name,value):
        now = timezone.now()
        if value == 'today':
            return queryset.filter(published_at__date = now.date())
        if value == 'week':
            week_ago = now - timedelta(days=7)
            return queryset.filter(published_at__date__gte = week_ago)
        if value == 'month':
            month_ago = now - timedelta(days=30)
            return queryset.filter(published_at__date__gte= month_ago)
        return queryset


    class Meta:
        model = models.Post
        fields = {
            'category' : ['exact'],
            # 'published_at': ['gt', 'lt'],
        }