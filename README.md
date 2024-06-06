# LitFinder API

## List of contents

- [Start Project](#start-project)
- [Endpoint](#endpoint)
- [Account](#account)
  - [Register](#register)
  - [Login](#login)
- [Book](#book)
  - [Get All Book](#get-all-book)
  - [Get Recommendation Book](#get-recommendation-book)
- [Logging](#logging)
  - [Insert Log User](#insert-log-user)
- [Bookself](#bookself)
  - [Get Bookself User](#get-bookself-user)
  - [Insert Bookself](#insert-bookself)
  - [Update Bookself to Read](#update-book-to-read)
  - [Update Bookself to Finish](#update-book-to-finish)
- [Genre](#genre)
  - [Get All Genre](#get-all-genre)
- [Preference](#preference)
  - [Insert Genre Preference](#insert-genre-preference)
  - [Insert Book Preference](#insert-book-preference)

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
  "search": string | optional
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

## Logging

> Need `token` to access API

### Insert Log User

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /log
```

- Body Request

```javascript
{
  "user_id": integer | required,
  "book_id": integer | required,
}
```

- Example Body Request

```json
{
  "user_id": 1,
  "book_id": 47
}
```

- Example Response

```json
{
  "status": "success",
  "message": "Log has been sent"
}
```

## bookself

> Need `token` to access API

### Get Bookself User

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /bookself
```

- Body Request

```javascript
{
  "user_id": integer | required,
  "filter": integer | optional | ["want", "read", "finish"] | (default: "all"),
}
```

- Example Body Request

```json
{
  "user_id": 1,
  "filter": "finish"
}
```

- Example Response

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "book_id": 5,
      "status": "finish",
      "rating_id": 2999991,
      "createdAt": "2024-06-04T20:45:34.000Z",
      "book": [
        {
          "id": 5,
          "title": "The Church of Christ: A Biblical Ecclesiology for Today",
          "description": "In The Church of Christ: A Biblical Ecclesiology for To...",
          "authors": "['Everett Ferguson']",
          "image": "http://books.google.com/books...",
          "previewLink": "http://books.google.nl/book...",
          "publisher": "Wm. B. Eerdmans Publishing",
          "publishedDate": "1996",
          "infoLink": "http://books.google.n...",
          "categories": "['Religion']",
          "ratingsCount": 5
        }
      ],
      "rating": {
        "id": 2999991,
        "book_id": null,
        "title": "The Church of Christ: A Bibl...",
        "price": null,
        "user_id": "1",
        "profileName": "Bintang",
        "reviewHelpfulness": "8/10",
        "reviewScore": 4,
        "reviewTime": null,
        "reviewSummary": "Good Book",
        "reviewText": "Absolutely this amazing book"
      }
    }
  ]
}
```

### Insert Bookself

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /bookself/add
```

- Body Request

```javascript
{
  "user_id": integer | required,
  "book_id": integer | required,
}
```

- Example Body Request

```json
{
  "user_id": 1,
  "book_id": 31
}
```

- Example Response

```json
{
  "status": "success",
  "message": "Book has been added to bookself"
}
```

### Update Book to Read

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /bookself/update
```

- Body Request

```javascript
{
  "bookself_id": integer | required,
  "status": string | required | "read",
}
```

- Example Body Request

```json
{
  "bookself_id": 1,
  "status": "read"
}
```

- Example Response

```json
{
  "status": "success",
  "message": "Bookself has been updated"
}
```

### Update Book to Finish

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /bookself/update
```

- Body Request

```javascript
{
  "bookself_id": integer | required,
  "status": string | required | "finish",
  "title": string | required,
  "user_id": int | required,
  "profileName": string | required,
  "reviewHelpfulness": string | required,
  "reviewScore": int | required,
  "reviewSummary": string | required,
  "reviewText": string | required,
}
```

- Example Body Request

```json
{
  "bookself_id": 1,
  "status": "finish",
  "title": "The Church of Christ: A Biblical Ecclesiology for Today",
  "user_id": 1,
  "profileName": "Bintang",
  "reviewHelpfulness": "8/10",
  "reviewScore": 4,
  "reviewSummary": "Good Book",
  "reviewText": "Absolutely this amazing book"
}
```

- Example Response

```json
{
  "status": "success",
  "message": "Bookself has been updated"
}
```

## Genre

> Need `token` to access API

### Get All Genre

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
GET /genre
```

- Example Response

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Romantis",
      "createdAt": "2024-06-05T06:31:06.000Z",
      "updatedAt": "2024-06-05T06:31:06.000Z"
    },
    {
      "id": 2,
      "name": "Humor",
      "createdAt": "2024-06-05T06:32:10.000Z",
      "updatedAt": "2024-06-05T06:32:10.000Z"
    },
    {
      "id": 3,
      "name": "Horror",
      "createdAt": "2024-06-05T06:32:18.000Z",
      "updatedAt": "2024-06-05T06:32:18.000Z"
    },
    {
      "id": 4,
      "name": "Comedy",
      "createdAt": "2024-06-05T06:32:25.000Z",
      "updatedAt": "2024-06-05T06:32:25.000Z"
    }
  ]
}
```

## Preference

> Need `token` to access API

### Insert Genre Preference

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /preference/genre/add
```

- Body Request

```javascript
{
  "user_id": integer | required,
  "genres": array | required,
}
```

- Example Body Request

```json
{
  "user_id": 1,
  "genres": [1, 2, 4]
}
```

- Example Response

```json
{
  "status": "success",
  "data": "Preference has been inserted"
}
```

### Insert Book Preference

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /preference/book/add
```

- Body Request

```javascript
{
  "user_id": integer | required,
  "books": array | required,
}
```

- Example Body Request

```json
{
  "user_id": 1,
  "books": [5, 33]
}
```

- Example Response

```json
{
  "status": "success",
  "data": "Preference has been inserted"
}
```
