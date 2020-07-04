# Nginx log retriever

1. A basic backend application which uses AWS cognito for authentication and registration of users.
2. Authentic user can then retrieve logs

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install all the dependencies present in package.json.

```bash
npm i
```

## Environment setup

Create a .env file with following variables

```
PORT= 
COGNITO_POOL_ID= 
COGNITO_CLIENT_ID= 
REGION=
```

## APIs

1. ## **Register User**

Registers a single user.

- **URL**

  `/api/auth/register`

- **Method:**

  `POST`

- **Header:**

  `content-type: application/json`

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

  `/api/auth/confirm`

- **Method:**

  `POST`

- **Header:**

  `content-type: application/json`

- **Body**

  **Required:**

  `username = [string] code = [string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ status : "success", data: returnData, err: null }`

- **Error Response:**

  - **Code:** 401 Unauthorized <br />
    **Content:** `{ status : "failure", data: null, err: err }`

3. ## **Login User**

Api for user login

- **URL**

  `/api/auth/login`

- **Method:**

  `POST`

- **Header:**

  `content-type: application/json`

- **Body**

  **Required:**

  `username = [string] password = [string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ status : "success", data: returnData, err: null }`

- **Error Response:**

  - **Code:** 401 Unauthorized <br />
    **Content:** `{ status : "failure", data: null, err: err }`

3. ## **nginx logs retriever**

API for getting nginx access logs. Logs can be filtered on the basis of timestamps of date range or IP address using query params.

- **URL**

  `/api/logs`

- **Method:**

  `GET`

- **Header:**

  `content-type: application/json, authorization: Bearer {token}`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ status : "success", data: {count: count, logs: [logs]}, err: null }`

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:** `{ status : "failure", data: null, err: err }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ status : "failure", data: null, err: err }`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
