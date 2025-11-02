# API Server

A Hono-based API server with Prisma ORM and SQLite database.

The server will start at `http://localhost:3000`

## Available Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint
- `pnpm run lint:fix` - Fix ESLint errors
- `pnpm run db:push` - Push schema changes to database
- `pnpm run db:generate` - Generate Prisma client
- `pnpm run db:studio` - Open Prisma Studio (database GUI)

## API Endpoints

### Health Check

```
GET /
```

**Description:** Health check endpoint

**Response:**
```json
"Hello Hono!"
```

---

### List Blogs

```
GET /api/blogs
```

**Description:** Get a paginated list of all blogs

**Query Parameters:**
- `limit` (number, optional): Number of items per page (min: 1, max: 100, default: 10)
- `offset` (number, optional): Number of items to skip (min: 0, default: 0)
- `orderBy` (string, optional): Field to order by - `title`, `createdAt`, or `updatedAt` (default: `createdAt`)
- `order` (string, optional): Sort order - `asc` or `desc` (default: `desc`)

**Response:**
```json
{
  "data": [
    {
      "id": "clxxx123456789",
      "slug": "my-first-blog",
      "title": "My First Blog",
      "content": { "type": "doc", "content": [...] },
      "contentHtml": "<p>Blog content here...</p>",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "limit": 10,
    "offset": 0,
    "currentPage": 1,
    "totalPages": 5,
    "totalCount": 50,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

### Get Single Blog

```
GET /api/blogs/:blog
```

**Description:** Get a single blog by ID or slug

**Path Parameters:**
- `blog` (string, required): Blog ID (CUID) or slug

**Query Parameters:**
- `type` (string, optional): Search type - `id` or `slug` (default: `id`)

**Response:**
```json
{
  "data": {
    "id": "clxxx123456789",
    "slug": "my-first-blog",
    "title": "My First Blog",
    "content": { "type": "doc", "content": [...] },
    "contentHtml": "<p>Blog content here...</p>",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Note:** Returns `null` if blog is not found:
```json
{
  "data": null
}
```

---

### Create Blog

```
POST /api/blogs
```

**Description:** Create a new blog post

**Content-Type:** `application/json`

**Body:**
```json
{
  "title": "My New Blog",
  "slug": "my-new-blog",
  "content": { "type": "doc", "content": [...] },
  "contentHtml": "<p>This is the content of my blog post</p>"
}
```

**Body Parameters:**
- `title` (string, required): Blog title (min: 1, max: 500 characters)
- `slug` (string, optional): Blog slug (max: 500 characters) - auto-generated from CUID if not provided or empty
- `content` (JSON, optional): Blog content in JSON format (e.g., TipTap/ProseMirror document)
- `contentHtml` (string, optional): Blog content in HTML format

**Response:**
```json
{
  "data": {
    "id": "clxxx123456789",
    "slug": "my-new-blog",
    "title": "My New Blog",
    "content": { "type": "doc", "content": [...] },
    "contentHtml": "<p>This is the content of my blog post</p>",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update Blog

```
PUT /api/blogs/:blog
PATCH /api/blogs/:blog
```

**Description:** Update an existing blog post (all fields are optional)

**Content-Type:** `application/json`

**Path Parameters:**
- `blog` (string, required): Blog ID (CUID only, not slug)

**Body:**
```json
{
  "title": "Updated Blog Title",
  "slug": "updated-slug",
  "content": { "type": "doc", "content": [...] },
  "contentHtml": "<p>Updated content</p>"
}
```

**Body Parameters:**
- `title` (string, optional): Blog title (min: 1, max: 500 characters)
- `slug` (string, optional): Blog slug (min: 1, max: 500 characters)
- `content` (JSON, optional): Blog content in JSON format
- `contentHtml` (string, optional): Blog content in HTML format

**Response:**
```json
{
  "data": {
    "id": "clxxx123456789",
    "slug": "updated-slug",
    "title": "Updated Blog Title",
    "content": { "type": "doc", "content": [...] },
    "contentHtml": "<p>Updated content</p>",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

---

### Delete Blog

```
DELETE /api/blogs/:blog
```

**Description:** Delete a blog post

**Path Parameters:**
- `blog` (string, required): Blog ID (CUID only, not slug)

**Response:**
```json
{
  "data": {
    "id": "clxxx123456789",
    "slug": "deleted-blog",
    "title": "Deleted Blog",
    "content": { "type": "doc", "content": [...] },
    "contentHtml": "<p>This blog was deleted</p>",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Data Models

### Blog

```typescript
{
  id: string;               // CUID
  slug: string;             // Unique slug, auto-generated if not provided
  title: string;            // Blog title
  content: JSON | null;     // JSON content (e.g., TipTap/ProseMirror document)
  contentHtml: string | null; // HTML rendered content
  createdAt: Date;          // Creation timestamp
  updatedAt: Date;          // Last update timestamp
}
```

### Pagination Meta

```typescript
{
  limit: number;        // Items per page
  offset: number;       // Items skipped
  currentPage: number;  // Current page number (1-based)
  totalPages: number;   // Total number of pages
  totalCount: number;   // Total number of items
  hasNextPage: boolean; // Whether next page exists
  hasPrevPage: boolean; // Whether previous page exists
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

**Validation Error (400):**
```json
{
  "success": false,
  "error": {
    "issues": [
      {
        "code": "too_small",
        "minimum": 1,
        "type": "string",
        "inclusive": true,
        "message": "String must contain at least 1 character(s)",
        "path": ["title"]
      }
    ],
    "name": "ZodError"
  }
}
```

**Not Found (404):**
```json
{
  "message": "Blog not found"
}
```

**Server Error (500):**
```json
{
  "message": "Internal server error"
}
```
