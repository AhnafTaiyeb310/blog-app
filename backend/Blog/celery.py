from celery import Celery
import os

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Blog.settings')

# Create Celery app
app = Celery('Blog')

# Load config from Django settings
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks in all installed apps
app.autodiscover_tasks()
