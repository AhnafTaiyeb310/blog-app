from celery import shared_task
from django.contrib.contenttypes.models import ContentType
from .models import Notifications

@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=10)
def create_notifications(user_id, message, content_type_id=None, object_id=None):
    Notifications.objects.create(
        user_id= user_id,
        message= message,
        content_type_id= content_type_id,
        object_id= object_id
    )