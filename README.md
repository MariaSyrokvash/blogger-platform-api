# Blogger Platform API (Sprint 01 - Homework 02)

Backend application for managing blogs and posts, built with Node.js, Express, and TypeScript. This project follows the requirements for **Sprint 1 (Week 2)**.

## 🚀 Features

- **RESTful API** for Blogs and Posts.
- **Input Validation**: Strict validation using `express-validator`.
- **Security**: Basic Authentication for all mutation operations (POST, PUT, DELETE).
- **Testing**: Dedicated endpoint to clear data for automated testing.

## 🛠 Tech Stack

- **Language**: TypeScript
- **Framework**: Express.js
- **Validation**: express-validator
- **Auth**: Basic Auth (admin:qwerty)

## 📋 API Endpoints

### Blogs

- `GET /api/blogs` — Returns all blogs.
- `POST /api/blogs` — Create new blog (Basic Auth required).
- `GET /api/blogs/{id}` — Returns blog by id.
- `PUT /api/blogs/{id}` — Update existing blog (Basic Auth required).
- `DELETE /api/blogs/{id}` — Delete blog by id (Basic Auth required).

### Posts

- `GET /api/posts` — Returns all posts.
- `POST /api/posts` — Create new post (Basic Auth required).
- `GET /api/posts/{id}` — Returns post by id.
- `PUT /api/posts/{id}` — Update existing post (Basic Auth required).
- `DELETE /api/posts/{id}` — Delete post by id (Basic Auth required).

### Testing

- `DELETE /api/testing/all-data` — Clear all data in the database.

## ⚠️ Validation Rules

In case of incorrect input, the API returns a **400 Bad Request** status with the following structure:

```json
{
  "errorsMessages": [
    {
      "message": "Error message description",
      "field": "fieldName"
    }
  ]
}
```
