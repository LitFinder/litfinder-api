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
