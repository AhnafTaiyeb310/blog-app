from django.db import models
from django.conf import settings

class Category(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = 'Categories'


class Post(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('scheduled', 'Scheduled'),
        ('archived', 'Archived'),
    ]
    VISIBILITY_CHOICES =[
        ('public', 'Public'),
        ('private', 'Private'),
        ('password', 'Password Protected')
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    excerpt = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default= 'draft')
    visibility = models.CharField(max_length=20, choices=VISIBILITY_CHOICES, default='public')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
    scheduled_for = models.DateTimeField(null=True, blank=True)
    
    
    author = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, related_name='posts')
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL)
    
    # tags = 
    # likes = 

    def __str__(self):
        return self.title

class PostImages(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='blog/images')

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile',)
    bio = models.TextField()
    # profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
    
    class Meta:
        ordering = ['user__first_name', 'user__last_name']
    
class Comment(models.Model):
    STATUS_CHOICE = [
        ('pending',"Pending"),
        ('approved', 'Approved'),
        ('spam','Spam'),
    ]

    content = models.TextField()
    guest_name = models.CharField(max_length=255, blank=True, null=True)
    guest_email = models.EmailField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICE, default= 'pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        if self.author:
            return f'{self.author.username} - {self.content[0:30]}'
        else:
            return f'{self.guest_name} - {self.content[0:30]}'
    
    
    class Meta:
        ordering = ['-created_at']



