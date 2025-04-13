# API Documentation

## Base URL
/api


## Authentication
- All protected endpoints require a valid JWT token
- Token should be included in the Authorization header: `Authorization: Bearer <token>`
- 401 response for invalid/expired tokens
- 403 response for insufficient permissions

## Endpoints

### Authentication

#### POST /api/auth/login
Authenticate a user and receive a JWT token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
Response (200 OK):

Copy{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
POST /api/auth/register
Register a new user.

Request:

Copy{
  "email": "newuser@example.com",
  "password": "securepassword",
  "name": "New User"
}
Response (201 Created):

Copy{
  "token": "jwt-token-here",
  "user": {
    "id": "new-user-id",
    "email": "newuser@example.com",
    "name": "New User"
  }
}
Sources
GET /api/sources
Get all sources for the authenticated user.

Response (200 OK):

Copy{
  "sources": [
    {
      "id": "source-id-1",
      "name": "Source Name",
      "url": "https://source-url.com",
      "type": "rss",
      "lastFetched": "2023-01-01T00:00:00Z",
      "status": "active"
    }
  ]
}
POST /api/sources
Create a new source.

Request:

Copy{
  "name": "New Source",
  "url": "https://new-source-url.com",
  "type": "rss"
}
Response (201 Created):

Copy{
  "id": "new-source-id",
  "name": "New Source",
  "url": "https://new-source-url.com",
  "type": "rss",
  "lastFetched": null,
  "status": "active"
}
PUT /api/sources/:sourceId
Update an existing source.

Request:

Copy{
  "name": "Updated Source Name",
  "url": "https://updated-url.com",
  "status": "paused"
}
Response (200 OK):

Copy{
  "id": "source-id",
  "name": "Updated Source Name",
  "url": "https://updated-url.com",
  "type": "rss",
  "lastFetched": "2023-01-01T00:00:00Z",
  "status": "paused"
}
DELETE /api/sources/:sourceId
Delete a source.

Response (204 No Content)

Posts
GET /api/posts
Get posts with optional filtering.

Query Parameters:

sourceId (optional): Filter by source
folderId (optional): Filter by folder
page (optional): Page number (default: 1)
limit (optional): Items per page (default: 20)
Response (200 OK):

Copy{
  "posts": [
    {
      "id": "post-id",
      "title": "Post Title",
      "summary": "Post summary...",
      "content": "Full content...",
      "source": {
        "id": "source-id",
        "name": "Source Name"
      },
      "publishedAt": "2023-01-01T00:00:00Z",
      "analysisResults": {
        "sentiment": "positive",
        "categories": ["category1", "category2"],
        "entities": ["entity1", "entity2"],
        "summary": "AI-generated summary..."
      }
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  }
}
GET /api/posts/:postId/raw
Get the raw content of a post.

Response (200 OK):

Copy{
  "id": "post-id",
  "title": "Post Title",
  "rawContent": "Original raw content...",
  "source": {
    "id": "source-id",
    "name": "Source Name"
  },
  "publishedAt": "2023-01-01T00:00:00Z"
}
Folders
GET /api/folders
Get all folders for the authenticated user.

Response (200 OK):

Copy{
  "folders": [
    {
      "id": "folder-id",
      "name": "Folder Name",
      "description": "Folder description",
      "postsCount": 42,
      "createdAt": "2023-01-01T00:00:00Z"
    }
  ]
}
POST /api/folders
Create a new folder.

Request:

Copy{
  "name": "New Folder",
  "description": "Folder description"
}
Response (201 Created):

Copy{
  "id": "new-folder-id",
  "name": "New Folder",
  "description": "Folder description",
  "postsCount": 0,
  "createdAt": "2023-01-01T00:00:00Z"
}
GET /api/folders/:folderId/posts
Get posts in a specific folder.

Query Parameters:

page (optional): Page number (default: 1)
limit (optional): Items per page (default: 20)
Response (200 OK):

Copy{
  "posts": [
    {
      "id": "post-id",
      "title": "Post Title",
      "summary": "Post summary...",
      "source": {
        "id": "source-id",
        "name": "Source Name"
      },
      "publishedAt": "2023-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}
Dashboard
GET /api/dashboard
Get dashboard data.

Query Parameters:

startDate (optional): Start date for data
endDate (optional): End date for data
folderId (optional): Filter by folder
Response (200 OK):

Copy{
  "metrics": {
    "totalPosts": 1245,
    "postsPerCategory": {
      "category1": 500,
      "category2": 745
    },
    "sentimentDistribution": {
      "positive": 600,
      "neutral": 400,
      "negative": 245
    }
  },
  "trends": {
    "postsByDay": [
      { "date": "2023-01-01", "count": 42 },
      { "date": "2023-01-02", "count": 56 }
    ],
    "categoriesByDay": [
      { 
        "date": "2023-01-01", 
        "categories": {
          "category1": 20,
          "category2": 22
        }
      }
    ]
  },
  "topEntities": [
    { "name": "Entity1", "count": 156 },
    { "name": "Entity2", "count": 129 }
  ]
}
Admin
GET /api/admin/analysis-modules
Get all analysis module configurations.

Response (200 OK):

Copy{
  "modules": [
    {
      "id": "module-id",
      "name": "Text Classification",
      "enabled": true,
      "parameters": {
        "param1": "value1",
        "param2": "value2"
      }
    }
  ]
}
PUT /api/admin/analysis-modules/:moduleId
Update an analysis module configuration.

Request:

Copy{
  "enabled": true,
  "parameters": {
    "param1": "updated-value1",
    "param2": "updated-value2"
  }
}
Response (200 OK):

Copy{
  "id": "module-id",
  "name": "Text Classification",
  "enabled": true,
  "parameters": {
    "param1": "updated-value1",
    "param2": "updated-value2"
  }
}
WebSocket Events
Connection: /api/socket...