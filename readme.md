# Nginx log retriever

1. A basic backend application which uses AWS cognito for authentication and registration of users.
2. Authentic user can then retrieve logs

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install all the dependencies present in package.json.

```bash
npm i
```

## APIs

## **Show User**

Returns json data about a single user.

- **URL**

  /users/:id

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 12, name : "Michael Bloom" }`

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

```
/api/auth/register
```

Method: POST
Body: {
username: username,
email: email,
password: password
}

```
/api/auth/login
```

```
/api/auth/confirm
```

```
/api/logs
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
