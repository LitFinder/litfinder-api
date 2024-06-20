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
  - [Collaboration Book](#get-recommendation-book--collaboration-book)
  - [Collaboration User](#get-recommendation-book--collaboration-user)
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
  - [Get Genre Preference User](#get-genre-preference-useer)
  - [Insert Book Preference](#insert-book-preference)
- [Forget Password](#forget-password)
  - [Send Kode Verif](#send-kode-verif)
  - [Change Password](#change-password)
- [Profile](#profile)
  - [Update Picture](#update-picture)
  - [Update Name](#update-name)
  - [Update Bio](#update-bio)
  - [Update Password](#update-password)

## Start Project

1. Import SQL file to your database
```
https://drive.google.com/drive/folders/1lq89LDQnEzM58WWjN5HRV6H3zUk5cL1A
```

2. Clone the repository

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

## Cloud Architecture
![Cloud Architecture](https://github.com/LitFinder/litfinder-api/assets/99628945/c058e150-f544-432e-8068-832d8360fb63)


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

### Get Recommendation Book | Collaboration Book

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /recommendation/colabBook
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
/recommendation/colabBook?limit=10&page=1
```

- Example Params Request with Rating

```text
/recommendation/colabBook?limit=10&page=1&rating=true
```

> If you put `rating` in params, rating will appear together with the book data

- Body Request

```javascript
{
  "book_id": integer | required,
}
```

- Example Body Request

```json
{
  "book_id": 1
}
```

- Example Response Without Rating

```json
{
  "status": "success",
  "data": {
    "recommendation": [
      {
        "title": "In Search of Lost Roses",
        "description": "NEW YORK TIMES BESTSELLER • Th...",
        "authors": "['Martha Hall Kelly']",
        "image": "http://books.google.com/books/con...",
        "previewLink": "http://books.google.com/book...",
        "publisher": "Ballantine Books",
        "publishedDate": "2019-04-09",
        "infoLink": "https://play.google.com/sto...",
        "categories": "['Fiction']",
        "ratingsCount": 19,
        "id": 38127
      },
      {
        "title": "The New Rabbi",
        "description": "The author of Thing of B...",
        "authors": "['Stephen Fried']",
        "image": "http://books.google.com/book..",
        "publisher": "Bantam",
        "publishedDate": "2003",
        "infoLink": "http://books.google.com...",
        "categories": "['Biography & Autobiography']",
        "ratingsCount": 1,
        "id": 35906
      }
    ],
    "fromCategory": [
      {
        "title": "The Gifted Adult: A Revolutio...",
        "description": "Are you relentlessly curious a...",
        "authors": "['Mary-Elaine Jacobsen']",
        "image": "http://books.google.com/books/conte...",
        "previewLink": "http://books.google.nl/books?id=...",
        "publisher": "Ballantine Books",
        "publishedDate": "2015-02-18",
        "infoLink": "https://play.google.com/store/b...",
        "categories": "['Psychology']",
        "ratingsCount": 1,
        "id": 96
      },
      {
        "title": "Healing Life's Hurts: Healing...",
        "description": "\"Explores the concept of emoti...",
        "authors": "['Matthew Linn', 'Dennis Linn']",
        "image": "http://books.google.com/boo..",
        "previewLink": "http://books.google.nl/...",
        "publisher": "Paulist Press",
        "publishedDate": "1978",
        "infoLink": "https://play.google.com/...",
        "categories": "['Psychology']",
        "ratingsCount": 1,
        "id": 151
      }
    ]
  }
}
```

- Example Response With Rating

```json
{
  "status": "success",
  "data": {
    "recommendation": [
      {
        "title": "In Search of Lost Roses",
        "description": "NEW YORK TIMES BESTSELLER • Th...",
        "authors": "['Martha Hall Kelly']",
        "image": "http://books.google.com/books/con...",
        "previewLink": "http://books.google.com/book...",
        "publisher": "Ballantine Books",
        "publishedDate": "2019-04-09",
        "infoLink": "https://play.google.com/sto...",
        "categories": "['Fiction']",
        "ratingsCount": 19,
        "id": 38127,
        "rating": [
          {
            "id": 152394,
            "user_id": "A1CBSK32XO02QK",
            "book_id": 38127,
            "profileName": "_willow_11_",
            "reviewHelpfulness": "25/25",
            "reviewScore": 5,
            "reviewSummary": "~a life-long collect....~",
            "reviewText": "There are few books in my ga..."
          }
        ]
      },
      {
        "title": "The New Rabbi",
        "description": "The author of Thing of B...",
        "authors": "['Stephen Fried']",
        "image": "http://books.google.com/book..",
        "publisher": "Bantam",
        "publishedDate": "2003",
        "infoLink": "http://books.google.com...",
        "categories": "['Biography & Autobiography']",
        "ratingsCount": 1,
        "id": 35906,
        "rating": [
          {
            "id": 144932,
            "user_id": "A17437N1L775IJ",
            "book_id": 35906,
            "profileName": "Janet Gerber",
            "reviewHelpfulness": "0/0",
            "reviewScore": 4,
            "reviewSummary": "fascinating read...",
            "reviewText": "I read this and also gifte..."
          }
        ]
      }
    ],
    "fromCategory": [
      {
        "title": "The Gifted Adult: A Revolutio...",
        "description": "Are you relentlessly curious a...",
        "authors": "['Mary-Elaine Jacobsen']",
        "image": "http://books.google.com/books/conte...",
        "previewLink": "http://books.google.nl/books?id=...",
        "publisher": "Ballantine Books",
        "publishedDate": "2015-02-18",
        "infoLink": "https://play.google.com/store/b...",
        "categories": "['Psychology']",
        "ratingsCount": 1,
        "id": 96,
        "rating": [
          {
            "id": 6495,
            "user_id": "A38HE3WVG1E3EG",
            "book_id": 96,
            "profileName": "Peter Messerschmidt \"denmarkguy\"",
            "reviewHelpfulness": "119/121",
            "reviewScore": 5,
            "reviewSummary": "An Important and Possibly Lif..",
            "reviewText": "&quot;The Gifted Adult&quot.."
          }
        ]
      },
      {
        "title": "Healing Life's Hurts: Healing...",
        "description": "\"Explores the concept of emoti...",
        "authors": "['Matthew Linn', 'Dennis Linn']",
        "image": "http://books.google.com/boo..",
        "previewLink": "http://books.google.nl/...",
        "publisher": "Paulist Press",
        "publishedDate": "1978",
        "infoLink": "https://play.google.com/...",
        "categories": "['Psychology']",
        "ratingsCount": 1,
        "id": 151,
        "rating": []
      }
    ]
  }
}
```

### Get Recommendation Book | Collaboration User

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /recommendation/colabUser
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
/recommendation/colabUser?limit=10&page=1
```

- Example Params Request with Rating

```text
/recommendation/colabUser?limit=10&page=1&rating=true
```

> If you put `rating` in params, rating will appear together with the book data

- Body Request

```javascript
{
  "user_id": String | required,
}
```

- Example Body Request

```json
{
  "user_id": "A3NDZCQ9D9T2XM"
}
```

- Example Response Without Rating

```json
{
  "status": "success",
  "data": [
    {
      "title": "Advanced Programming in the UNIX Environment (2nd Edition)",
      "description": "For more than twenty years, serious C pr..",
      "authors": "['W. Richard Stevens', 'Stephen A. Rago']",
      "image": "http://books.google.com/books/con..",
      "previewLink": "http://books.google.nl/book..",
      "publisher": "Addison-Wesley",
      "publishedDate": "2013-06-10",
      "infoLink": "https://play.google.com/st...",
      "categories": "['Computers']",
      "ratingsCount": 6,
      "id": 971
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
      "title": "Advanced Programming in the UNIX Environment (2nd Edition)",
      "description": "For more than twenty years, serious C pr..",
      "authors": "['W. Richard Stevens', 'Stephen A. Rago']",
      "image": "http://books.google.com/books/con..",
      "previewLink": "http://books.google.nl/book..",
      "publisher": "Addison-Wesley",
      "publishedDate": "2013-06-10",
      "infoLink": "https://play.google.com/st...",
      "categories": "['Computers']",
      "ratingsCount": 6,
      "id": 971,
      "rating": [
        {
          "id": 34077,
          "user_id": "AG35NEEFCMQVR",
          "book_id": 971,
          "profileName": "W Boudville",
          "reviewHelpfulness": "29/29",
          "reviewScore": 5,
          "reviewSummary": "superb update of the first edition",
          "reviewText": "Many of you who learnt unix i.."
        },

        {
          "id": 34131,
          "user_id": "A3M3XHSQJMXHDA",
          "book_id": 971,
          "profileName": "Rujirek",
          "reviewHelpfulness": "2/3",
          "reviewScore": 5,
          "reviewSummary": "Easy for learning",
          "reviewText": "This text book is easy for anyone who study about computer directly and has some experience with Linux. It give you both of knowlege and C source code example.if you want to know about Unix and others unix-based operating system, I recommend it."
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

### Get Genre Preference Useer

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /preference/genre/user
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
      "id": 1,
      "name": "Religion"
    },
    {
      "id": 2,
      "name": "Biography & Autobiography"
    },
    {
      "id": 5,
      "name": "Foreign Language Study"
    }
  ]
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

## Profile

> Need `token` to access API

### Update Picture

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /profile/picture
```

- Body Request

```javascript
{
  "user_id": integer | required,
  "picture": file | required | MAX: 3MB,
}
```

- Example Body Request

```json
{
  "user_id": 1,
  "picture": File()
}
```

- Example Response

```json
{
  "status": "success",
  "message": "Profile picture updated successfully",
  "newImage": "https://storage.googleapis.com/c241-ps384-bucket/uploads/profile/1718437150694-Desktop_14.png"
}
```

### Update Name

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /profile/name
```

- Body Request

```javascript
{
  "user_id": integer | required,
  "name": string | required,
}

```

- Example Body Request

```json
{
  "user_id": 1,
  "name": "Naisyuu"
}
```

- Example Response

```json
{
  "status": "success",
  "message": "Name updated successfully",
  "newData": {
    "id": 1,
    "email": "naisyuu21@gmail.com",
    "username": "bintang",
    "name": "Naisyuu",
    "bio": "Let's have an adventure.",
    "imageProfile": "https://storage.googleapis.com/c241-ps384-bucket/uploads/profile/1718436383598-Desktop_14.png",
    "createdAt": "2024-06-13T05:29:44.000Z",
    "updatedAt": "2024-06-13T05:29:44.000Z"
  }
}
```

### Update Bio

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /profile/bio
```

- Body Request

```javascript
{
  "user_id": integer | required,
  "bio": string | required,
}

```

- Example Body Request

```json
{
  "user_id": 1,
  "bio": "Let's have an adventure."
}
```

- Example Response

```json
{
  "status": "success",
  "message": "Bio updated successfully",
  "newData": {
    "id": 1,
    "email": "naisyuu21@gmail.com",
    "username": "bintang",
    "name": "Naisyuu",
    "bio": "Let's have an adventure.",
    "imageProfile": "https://storage.googleapis.com/c241-ps384-bucket/uploads/profile/1718436383598-Desktop_14.png",
    "createdAt": "2024-06-13T05:29:44.000Z",
    "updatedAt": "2024-06-13T05:29:44.000Z"
  }
}
```

### Update Password

- Headers

```http
Authorization: <Token>
Content-Type: application/json
```

- Path

```http
POST /profile/password
```

- Body Request

```javascript
{
  "user_id": integer | required,
  "old_password": string | required,
  "new_password": string | required,
}

```

- Example Body Request

```json
{
  "user_id": 1,
  "old_password": "12345678",
  "new_password": "123"
}
```

- Example Response

```json
{
  "status": "success",
  "message": "Password updated successfully"
}
```
