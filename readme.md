# Nginx log retriever

1. A basic backend application which uses AWS cognito for authentication and registration of users.
2. Authentic user can then retrieve logs

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install all the dependencies present in package.json.

```bash
npm i
```

## APIs

1. ## **Register User**

Registers a single user.

- **URL**

  /api/auth/register

- **Method:**

  `POST`

- **Body**

  **Required:**

  `username = [string] email = [string] password = [string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ status : "success", data: returnData, err: null }`

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:** `{ status : "failure", data: null, err: err }`

2. ## **Verify User**

Verifies the user

- **URL**

  /api/auth/confirm

- **Method:**

  `POST`

- **Body**

  **Required:**

  `username = [string] code = [string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ status : "success", data: returnData, err: null }`

- **Error Response:**

  - **Code:** 401 Unauthorized <br />
    **Content:** `{ status : "failure", data: null, err: err }`

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
