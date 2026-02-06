# AI Context - Blog Application

## Project Overview

Django REST Framework blogging platform with RESTful API. Users can create, read, update, and delete blog posts with categories, comments, and media attachments. Supports anonymous comments, draft management, and content tagging system. Includes background task processing via Celery and Redis.

## Tech Stack

- **Framework**: Django 5.2.7
- **API**: Django REST Framework
- **Authentication**: Djoser (JWT tokens)
- **Database**: SQLite3 (Development)
- **Filters**: django_filters
- **Debug**: debug_toolbar
- **Task Queue**: Celery
- **Broker/Result Backend**: Redis
- **Frontend**: Not specified (standalone API)

## Folder Structure

```
backend/
├── apps/
│   ├── blog/           # Core blog functionality
│   │   ├── models.py   # Post, Category, Comment, Profile, PostImages
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── tasks.py    # Background tasks (e.g., image processing)
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
│   ├── celery.py       # Celery app configuration
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
- **Background Tasks**: Image processing task (`process_post_image`) triggered on image upload.

### Tagging System (apps/tags/)
- Tag entity for categories
- GenericForeignKey for flexible tagging (TaggedItem model)
- *Note: Views/URLs not yet implemented.*

### Like System (apps/likes/)
- Generic relation for liking any content type
- Content-type/object-id indexing for performance
- *Note: Views/URLs not yet implemented.*

### API Architecture
- RESTful resource-based routing
- Nested routes for related resources
- DjangoFilterBackend for query filtering
- Permission-based access control (public read, authenticated write)

## State Management

- Django ORM as data store
- SQLite3 database (development)
- Redis for Celery task broker and results
- Session-based admin interface
- JWT tokens for API state persistence
- Manual profile creation on first access

## Data Flow

1. **User Action** (Create post with image)
   - Frontend sends POST request to /blog/posts/ (creates Post)
   - Frontend sends POST request to /blog/posts/{id}/images/ (uploads Image)
   
2. **API Processing**
   - **Post**: `PostModelViewset` creates post record.
   - **Image**: `PostImageModelViewset` saves image, then triggers `process_post_image.delay(instance.id)`.

3. **Background Processing**
   - Celery worker picks up the task from Redis.
   - `process_post_image` resizes/optimizes the image asynchronously.

4. **Query Execution**
   - `select_related()` for foreign key relationships
   - `prefetch_related()` for many-to-many collections
   - DjangoFilterBackend for field filtering

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

## Key Design Patterns

### Generic Relations
- TaggedItem and LikedItem use ContentType + object_id for flexible relationships
- Enables tagging/liking any model type without foreign keys

### Asynchronous Processing
- Celery used for heavy lifting (image processing) to keep API response times low.

### Permission Inheritance
- Base permission classes defined in viewset.get_permissions()

## Known Limitations / Todo

1.  **Views Missing**: `apps/likes` and `apps/tags` have models but no views or URLs.
2.  **Security**: `DEBUG=True` and insecure secret key.
3.  **Database**: SQLite used.
4.  **Testing**: Comprehensive tests needed for background tasks and new apps.
5.  **Notifications**: Not yet implemented.

## Dependencies

- Django REST Framework
- Djoser (authentication)
- Celery + Redis
- Pillow (Image processing)
- django-filters
- debug-toolbar
- rest_framework_nested
- python-decouple