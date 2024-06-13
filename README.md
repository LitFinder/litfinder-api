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
- [Rating](#rating)
  - [Get Rating from Book ID](#get-rating-from-book-id)
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
- [Forget Password](#forget-password)
  - [Send Kode Verif](#send-kode-verif)
    [Change Password](#change-password)


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
http://34.27.235.243:1234
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
  "status": "success",
  "token": "...0IjoxNzE4MjczODQxf",
  "message": "Register berhasil",
  "data": {
    "id": 4,
    "email": "mphstar@gmail.com",
    "username": "mphstar",
    "name": "Mphstar",
    "bio": null,
    "imageProfile": null
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
  "token": "...eyJhbGciOiJIUzI1NiIsInR5",
  "data": {
    "id": 1,
    "email": "bintang@gmail.com",
    "username": "bintang",
    "name": "Bintang",
    "bio": null,
    "imageProfile": null
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
  "rating": "true" | optional
}
```

- Example Params Request

```text
/book?limit=10&page=1
```

- Example Params Request with Rating

```text
/book?limit=10&page=1&rating=true
```

> If you put `rating` in params, rating will appear together with the book data

- Example Response Without Rating

```json
{
  "status": "success",
  "data": [
    {
      "title": "The Church of Chris..",
      "description": "In The Church of C..",
      "authors": "['Everett Ferguson']",
      "image": "http://books.google...i",
      "previewLink": "http://books.goog..",
      "publisher": "Wm. B. Eerdmans..",
      "publishedDate": "1996",
      "infoLink": "http://books.google.n..",
      "categories": "['Religion']",
      "ratingsCount": 5,
      "id": 1
    }
  ]
}
```

- Example Response With Rating

```json
{
  "status": "success",
  "data": [
    {
      "title": "The Church of Chris..",
      "description": "In The Church of C..",
      "authors": "['Everett Ferguson']",
      "image": "http://books.google...i",
      "previewLink": "http://books.goog..",
      "publisher": "Wm. B. Eerdmans..",
      "publishedDate": "1996",
      "infoLink": "http://books.google.n..",
      "categories": "['Religion']",
      "ratingsCount": 5,
      "id": 1,
      "rating": [
        {
          "id": 53,
          "user_id": "A2H2LORTA5EZY2",
          "book_id": 1,
          "profileName": "Edward E. Howe",
          "reviewHelpfulness": "3/5",
          "reviewScore": 4,
          "reviewSummary": "Christ is Lord",
          "reviewText": "This is a very use..."
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
  "rating": "true" | optional
}
```

- Example Params Request

```text
/recommendation?limit=10&page=1
```

- Example Params Request with Rating

```text
/recommendation?limit=10&page=1&rating=true
```

> If you put `rating` in params, rating will appear together with the book data

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

- Example Response Without Rating

```json
{
  "status": "success",
  "data": [
    {
      "title": "The Church of Chris..",
      "description": "In The Church of C..",
      "authors": "['Everett Ferguson']",
      "image": "http://books.google...i",
      "previewLink": "http://books.goog..",
      "publisher": "Wm. B. Eerdmans..",
      "publishedDate": "1996",
      "infoLink": "http://books.google.n..",
      "categories": "['Religion']",
      "ratingsCount": 5,
      "id": 1
    }
  ]
}
```

- Example Response With Rating

```json
{
  "status": "success",
  "data": [
    {
      "title": "The Church of Chris..",
      "description": "In The Church of C..",
      "authors": "['Everett Ferguson']",
      "image": "http://books.google...i",
      "previewLink": "http://books.goog..",
      "publisher": "Wm. B. Eerdmans..",
      "publishedDate": "1996",
      "infoLink": "http://books.google.n..",
      "categories": "['Religion']",
      "ratingsCount": 5,
      "id": 1,
      "rating": [
        {
          "id": 53,
          "user_id": "A2H2LORTA5EZY2",
          "book_id": 1,
          "profileName": "Edward E. Howe",
          "reviewHelpfulness": "3/5",
          "reviewScore": 4,
          "reviewSummary": "Christ is Lord",
          "reviewText": "This is a very use..."
        }
      ]
    }
  ]
}
```

## Rating

> Need `token` to access API

### Get Rating from Book ID

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /rating
```

- Body Request

```javascript
{
  "book_id": integer | required,
}
```

- Example Body Request

```json
{
  "book_id": 47
}
```

- Example Response

```json
{
  "status": "success",
  "data": [
    {
      "id": 106,
      "user_id": "A1F0EV2MBF208I",
      "book_id": 5,
      "profileName": "Olena Y. Rabino..",
      "reviewHelpfulness": "14/14",
      "reviewScore": 4,
      "reviewSummary": "Very authentic",
      "reviewText": "This is my firs.."
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
        "id": 174296,
        "user_id": "1",
        "book_id": 31,
        "profileName": "Bintang",
        "reviewHelpfulness": "8/10",
        "reviewScore": 4,
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
  "book_id": int | required,
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
  "book_id": 31,
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

## Forget Password

### Send Kode Verif

- Headers

```http
Content-Type: application/json
```

- Path

```http
POST /send-kode
```

- Body Request

```javascript
{
  "email": string | required,
}
```

- Example Body Request

```json
{
  "email": "naisyuu21@gmail.com"
}
```

- Example Response

```json
{
  "message": "Code has been sent to your email",
  "kode": 968390
}
```

### Change Password

- Headers

```http
Content-Type: application/json
```

- Path

```http
POST /change-password
```

- Body Request

```javascript
{
  "email": string | required,
  "password": string | required,
}
```

- Example Body Request

```json
{
  "email": "naisyuu21@gmail.com",
  "password": "123"
}
```

- Example Response

```json
{
  "message": "Password has been changed"
}
```
