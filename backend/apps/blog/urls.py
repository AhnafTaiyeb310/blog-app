from django.urls import path
from rest_framework_nested import routers
from . import views


router = routers.DefaultRouter()
router.register('posts', views.PostModelViewset)
router.register('categories', views.CategoriesModelViewset)
router.register('profile', views.ProfileModelViewSet)
router.register('posts/drafts', views.PostDraftModelViewset, basename='draft-posts')


posts_router = routers.NestedDefaultRouter(router, 'posts', lookup='post')
posts_router.register('comments', views.CommentsModelViewset, basename='post-comments')
posts_router.register('images', views.PostImageModelViewset, basename='post-images')

urlpatterns = router.urls + posts_router.urls