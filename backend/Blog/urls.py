from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from debug_toolbar.toolbar import debug_toolbar_urls
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

admin.site.site_header = 'Blog Admin Page'
admin.site.index_title = 'Admin'
urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    
    path('blog/', include('apps.blog.urls')),
    path('likes/', include('apps.likes.urls')),
    path('tags/', include('apps.tags.urls')),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
] 

if settings.DEBUG:
    urlpatterns += debug_toolbar_urls() + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)