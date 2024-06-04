# LitFinder API

## List of contents

- [Start Project](#start-project)
- [Endpoint](#endpoint)
- [Account](#account)
  - [Register](#register)
  - [Login](#login)

## Start Project

1. Clone the repository

```
git clone https://github.com/LitFinder
```

2. Open Folder

```
cd LitFinder
```

3. Install Dependecies

```
npm install
```

4. Setting Up Environment

```
cp .env.example .env
```

5. Run Project

```
npm run start:dev
```

## API Documentation

> Postman API Documentation [check here](https://documenter.getpostman.com/view/24137835/2sA3Qy7VR1#01dd97ee-7f32-4c63-bfe0-b8f896aef99b)

#### Endpoint

- Production

```
https://litfinder-appspot.com/
```

- Development

```
http://127.0.0.1:3000
```

## Account

### Register

- Path

```http
POST /register
```

- Body Request

```javascript
{
  "name": string | required,
  "username": string | unique | required,
  "email": string | unique | required,
  "password": string | required | min: 3,
}
```

- Example Body Request

```json
{
  "name": "Bintang",
  "username": "mphstar",
  "email": "mphstar@gmail.com",
  "password": "123"
}
```

- Example Response

```json
{
  "message": "Register success",
  "data": {
    "id": "clwrodnj40001ybe4t3vh6766",
    "email": "mphstar@gmail.com",
    "username": "mphstar",
    "name": "Bintang",
    "password": ".....202cb962ac",
    "createdAt": "2024-05-29T10:20:15.327Z",
    "updatedAt": "2024-05-29T10:20:15.327Z"
  }
}
```

### Login

> Login refers to get `access token`

- Path

```http
POST /login
```

- Body Request

```javascript
{
  "email": string | required | email,
  "password": string | required | min: 3,
}
```

- Example Body Request

```json
{
  "email": "mphstar",
  "password": "123"
}
```

- Example Response

```json
{
  "message": "Login success",
  "token": "...EnG_V_E-d1U3lMCQ7r7ik",
  "data": {
    "id": "clwrodnj40001ybe4t3vh6766",
    "email": "mphstar@gmail.com",
    "username": "mphstar",
    "name": "Bintang",
    "password": "...4b07152d234b70",
    "createdAt": "2024-05-29T10:20:15.327Z",
    "updatedAt": "2024-05-29T10:20:15.327Z"
  }
}
```

## Book

> Need `token` to access API

### Get All Book

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
GET /book
```

- Params Request

```javascript
{
  "limit": integer | optional (default: 10),
  "page": integer | optional (default: 1),
}
```

- Example Params Request

```json
{
  "limit": 15,
  "page": 1
}
```

- Example Response

```json
{
  "status": "success",
  "data": [
    {
      "id": 5,
      "title": "The Church of Chris...",
      "description": "In The Church of ...",
      "authors": "['Everett Ferguson']",
      "image": "http://books.googl...",
      "previewLink": "http://books.google...",
      "publisher": "Wm. B. Eerdmans Publishing",
      "publishedDate": "1996",
      "infoLink": "http://books.googl...",
      "categories": "['Religion']",
      "ratingsCount": 5,
      "rating": [
        {
          "id": 47,
          "book_id": "0802841899",
          "title": "The Church of ...",
          "price": 25.97,
          "user_id": "ARI272XF8TOL4",
          "profileName": "Christopher J. Bray",
          "reviewHelpfulness": "74/81",
          "reviewScore": 5,
          "reviewTime": 955411200,
          "reviewSummary": "Ecclesiological Milestone",
          "reviewText": "With the publication of Everett..."
        }
      ]
    }
  ]
}
```

### Get Recommendation Book

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /recommendation
```

- Params Request

```javascript
{
  "limit": integer | optional (default: 10),
  "page": integer | optional (default: 1),
}
```

- Example Params Request

```json
{
  "limit": 15,
  "page": 1
}
```

- Body Request

```javascript
{
  "user_id": integer | required,
}
```

- Example Body Request

```json
{
  "user_id": 1
}
```

- Example Response

```json
{
  "status": "success",
  "data": [
    {
      "id": 5,
      "title": "The Church of Chris...",
      "description": "In The Church of ...",
      "authors": "['Everett Ferguson']",
      "image": "http://books.googl...",
      "previewLink": "http://books.google...",
      "publisher": "Wm. B. Eerdmans Publishing",
      "publishedDate": "1996",
      "infoLink": "http://books.googl...",
      "categories": "['Religion']",
      "ratingsCount": 5,
      "rating": [
        {
          "id": 47,
          "book_id": "0802841899",
          "title": "The Church of ...",
          "price": 25.97,
          "user_id": "ARI272XF8TOL4",
          "profileName": "Christopher J. Bray",
          "reviewHelpfulness": "74/81",
          "reviewScore": 5,
          "reviewTime": 955411200,
          "reviewSummary": "Ecclesiological Milestone",
          "reviewText": "With the publication of Everett..."
        }
      ]
    }
  ]
}
```
