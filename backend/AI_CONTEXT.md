# AI Context - Blog Application

## Project Overview

Django REST Framework blogging platform with RESTful API. Users can create, read, update, and delete blog posts with categories, comments, and media attachments. Supports anonymous comments, draft management, and content tagging system.

## Tech Stack

- **Framework**: Django 5.2.7
- **API**: Django REST Framework
- **Authentication**: Djoser (JWT tokens)
- **Database**: SQLite3
- **Filters**: django_filters
- **Debug**: debug_toolbar
- **Frontend**: Not specified (standalone API)

## Folder Structure

```
backend/
├── apps/
│   ├── blog/           # Core blog functionality
│   │   ├── models.py   # Post, Category, Comment, Profile, PostImages
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── users/          # User authentication & profiles
│   │   ├── models.py   # Custom User extending AbstractUser
│   │   └── serializers.py
│   ├── tags/           # Tagging system
│   │   └── models.py   # Tag, TaggedItem (generic relation)
│   └── likes/          # Like functionality
│       └── models.py   # LikedItem (generic relation)
├── media/              # Uploaded files (images, profile pics)
├── Blog/               # Django project config
│   ├── settings.py     # Config, auth, JWT settings
│   └── urls.py
└── db.sqlite3
```

## Core Components

### User Authentication (apps/users/)
- Custom User model extending AbstractUser with email field
- User profiles with bio, birth_date, is_verified
- JWT token-based authentication (120-minute expiry)
- User registration and profile management

### Blog Content (apps/blog/)
- Posts with status (draft/published/scheduled/archived), visibility (public/private/password)
- Hierarchical categories with parent-child relationships
- Post images support via PostImages model
- Comments with threading (parent/child replies) and guest support
- Draft post management via separate endpoint

### Tagging System (apps/tags/)
- Tag entity for categories
- GenericForeignKey for flexible tagging (TaggedItem model)

### Like System (apps/likes/)
- Generic relation for liking any content type
- Content-type/object-id indexing for performance

### API Architecture
- RESTful resource-based routing
- Nested routes for related resources
- DjangoFilterBackend for query filtering
- Permission-based access control (public read, authenticated write)

## State Management

- Django ORM as data store
- SQLite3 database (development)
- Session-based admin interface
- JWT tokens for API state persistence
- Manual profile creation on first access

## Data Flow

1. **User Action** (Create post)
   - Frontend sends POST request to /blog/posts/
   - JWT authentication validates request
   - IsAuthenticated permission check
   - PostModelViewset receives request

2. **API Processing** (apps/blog/views.py:16-31)
   - perform_create() sets author to authenticated user
   - Serializer validates data
   - Database transaction creates Post record
   - Response includes created object with metadata

3. **Related Operations**
   - Attachments: POST /blog/posts/{id}/images/
   - Comments: POST /blog/posts/{id}/comments/
   - Drafts: GET /blog/posts/drafts/ (user-specific)
   - Profile: GET/PUT /blog/profile/me/

4. **Query Execution**
   - select_related() for foreign key relationships
   - prefetch_related() for many-to-many collections
   - DjangoFilterBackend for field filtering
   - Custom queryset filtering for drafts/comments

## Naming Conventions

### Models
- PascalCase: Post, Category, Comment, Profile, User, Tag, LikedItem

### Serializers
- ModelNameSerializer: PostSerializer, CommentSerializer

### Views
- ModelNameViewset: PostModelViewset, CategoriesModelViewset

### URLs
- Resource-based: posts, categories, comments
- Nested: posts/{post_pk}/comments, posts/{post_pk}/images
- Custom: posts/drafts, profile/me

### Fields/Variables
- Python: snake_case
- Django ORM: snake_case, camelCase for auto-generated methods

### Permissions
- Class-based: AllowAny, IsAuthenticated
- Method-based: action decorators on viewsets

## Coding Style

### ViewSets (apps/blog/views.py)
```python
class PostModelViewset(ModelViewSet):
    queryset = models.Post.objects.select_related('category').prefetch_related('images').all()
    serializer_class = serializers.PostSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = filters.PostFilter

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]
```

### Serializers (apps/blog/serializers.py)
- Mix read-only fields with source mapping
- Custom validation in validate() method
- Nested serializers for related objects

### Nested Routing (apps/blog/urls.py)
```python
router = routers.DefaultRouter()
router.register('posts', views.PostModelViewset)

posts_router = routers.NestedDefaultRouter(router, 'posts', lookup='post')
posts_router.register('comments', views.CommentsModelViewset)
posts_router.register('images', views.PostImageModelViewset)
```

## Key Design Patterns

### Generic Relations
- TaggedItem and LikedItem use ContentType + object_id for flexible relationships
- Enables tagging/liking any model type without foreign keys

### Permission Inheritance
- Base permission classes defined in viewset.get_permissions()
- Different access levels for list/retrieve vs create/update/destroy

### Serializer Context
- Context passed from views to serializers (e.g., post_id for images)

### Custom User Model
- AUTH_USER_MODEL = 'users.User' in settings
- Extends Django's AbstractUser with email field

## Known Limitations

1. **Security**: Insecure secret key and DEBUG=True in production settings
2. **Database**: SQLite not suitable for production
3. **Image Storage**: Media files stored locally without CDN
4. **Password Policy**: Basic Django password validators only
5. **Content Moderation**: No automated spam detection for comments
6. **Rate Limiting**: No API rate limiting configured
7. **Caching**: No caching layer implemented
8. **Email**: No email verification or password reset configured
9. **File Upload**: No file validation or size limits

## API Endpoints Summary

### Authentication
- POST /auth/users/ - Register
- POST /auth/token/ - JWT login
- POST /auth/token/refresh/ - Refresh token

### Blog Posts
- GET /blog/posts/ - List all posts (public)
- GET /blog/posts/{id}/ - Retrieve post (public)
- POST /blog/posts/ - Create post (auth)
- PUT/PATCH /blog/posts/{id}/ - Update (auth)
- DELETE /blog/posts/{id}/ - Delete (auth)
- GET /blog/posts/drafts/ - List user drafts (auth)

### Posts Resources
- GET /blog/posts/{id}/comments/ - List post comments
- POST /blog/posts/{id}/comments/ - Add comment
- GET /blog/posts/{id}/images/ - List post images

### Categories
- GET /blog/categories/ - List categories

### Profile
- GET /blog/profile/me/ - Get profile
- PUT /blog/profile/me/ - Update profile

### Tags (Not fully implemented in views)
- Models exist but no endpoints configured

## Dependencies

- Django REST Framework
- Djoser (authentication)
- django-filters
- debug-toolbar
- rest_framework_nested (for nested routing)
- python-decouple (implied for environment config)

## Configuration Notes

- JWT access token lifetime: 120 minutes
- Custom user model: users.User
- Media files served at /media/ in DEBUG mode
- Admin site: /admin/ with custom header
- Debug toolbar enabled in DEBUG mode
