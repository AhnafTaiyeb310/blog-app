from celery import shared_task
from .models import PostImages
from PIL import Image, ImageOps 
import os
@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=10)
def process_post_image(self, image_id):
    instance = PostImages.objects.get(id=image_id)
    post_image = PostImages.objects.filter(id=image_id)
    img = Image.open(post_image.image.path)

    img = ImageOps.exif_tanspose(img)

    if img.width > 1920 or img.height > 1080:
        img.thumbnail((1920,1080))

    img.save(
        instance.image.path,
        quality= 80,
        optimize= True,
    )