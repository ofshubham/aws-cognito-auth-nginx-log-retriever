require("dotenv").config();

module.exports = {
  uri: process.env.CONNECTION_STRING,
  port: process.env.PORT,
  cognitoPoolId: process.env.COGNITO_POOL_ID,
  cognitoClientId: process.env.COGNITO_CLIENT_ID,
  region: process.env.REGION,
};
