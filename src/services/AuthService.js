const { cognitoPoolId, cognitoClientId, region } = require("../../environment");
const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const https = require("https");
const request = require("request");
global.fetch = require("node-fetch");
global.navigator = () => null;
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const poolData = {
  UserPoolId: cognitoPoolId,
  ClientId: cognitoClientId,
};
const pool_region = region;
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
exports.confirm = function (body, callback) {
  let { username, code } = body;
  try {
    let userData = {
      Username: username,
      Pool: userPool,
    };
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        console.log(err);
        callback(err.message, null);
      } else {
        callback(null, result);
      }
    });
  } catch (err) {
    callback(err.message, null);
  }
};
exports.Register = function (body, callback) {
  try {
    let { username, email, password } = body;
    let attributeList = [];
    attributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: email,
      })
    );
    // console.log(name, email, password);
    userPool.signUp(username, password, attributeList, null, function (
      err,
      result
    ) {
      if (err) {
        callback(err.message, null);
      } else {
        let cognitoUser = result.user;
        callback(null, cognitoUser);
      }
    });
  } catch (err) {
    callback(err.message, null);
  }
};

exports.Login = function (body, callback) {
  try {
    let { username, password } = body;
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: username,
        Password: password,
      }
    );
    let userData = {
      Username: username,
      Pool: userPool,
    };
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        let accesstoken = result.getAccessToken().getJwtToken();
        callback(null, accesstoken);
      },
      onFailure: function (err) {
        callback(err.message, null);
      },
    });
  } catch (err) {
    callback(err.message, null);
  }
};

exports.Validate = function (token, callback) {
  try {
    request(
      {
        url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true,
      },
      function (error, response, body) {
        // console.log(error);
        if (!error && response.statusCode === 200) {
          pems = {};
          let keys = body["keys"];
          for (var i = 0; i < keys.length; i++) {
            let key_id = keys[i].kid;
            let modulus = keys[i].n;
            let exponent = keys[i].e;
            let key_type = keys[i].kty;
            let jwk = { kty: key_type, n: modulus, e: exponent };
            let pem = jwkToPem(jwk);
            pems[key_id] = pem;
          }
          let decodedJwt = jwt.decode(token, { complete: true });
          if (!decodedJwt) {
            callback("Not a valid JWT token", null);
          }
          let kid = decodedJwt.header.kid;
          let pem = pems[kid];
          if (!pem) {
            callback("Invalid token", null);
          }
          jwt.verify(token, pem, function (err, payload) {
            if (err) {
              callback("Invalid token", null);
            } else {
              callback(null, "Valid token");
            }
          });
        } else {
          callback(error, null);
        }
      }
    );
  } catch (err) {
    callback(err.message, null);
  }
};
