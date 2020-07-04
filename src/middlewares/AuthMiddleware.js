const { cognitoPoolId, cognitoClientId, region } = require("../../environment");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");
const https = require("https");
const request = require("request");
global.fetch = require("node-fetch");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const { response } = require("express");
const poolData = {
  UserPoolId: cognitoPoolId,
  ClientId: cognitoClientId,
};
const pool_region = region;
exports.Validate = function (req, res, next) {
  try {
    let response = { status: "failure", data: null, err: null };
    if (req.headers["authorization"]) {
      var token = req.headers["authorization"].split("Bearer ")[1];
      request(
        {
          url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
          json: true,
        },
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            pems = {};
            var keys = body["keys"];
            for (var i = 0; i < keys.length; i++) {
              var key_id = keys[i].kid;
              var modulus = keys[i].n;
              var exponent = keys[i].e;
              var key_type = keys[i].kty;
              var jwk = { kty: key_type, n: modulus, e: exponent };
              var pem = jwkToPem(jwk);
              pems[key_id] = pem;
            }
            var decodedJwt = jwt.decode(token, { complete: true });
            if (!decodedJwt) {
              response.err = "Invalid token";
              res.status(401).json(response);
            }
            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
              response.err = "Invalid token";
              res.status(401).json(response);
            }
            jwt.verify(token, pem, function (err, payload) {
              if (err) {
                response.err = "Invalid token";
                res.status(401).json(response);
              } else {
                return next();
              }
            });
          } else {
            response.err = "Error! Unable to download JWKs";
            res.status(500).json(response);
          }
        }
      );
    } else {
      response.err = "Autherization token not found";
      res.status(400).json(response);
    }
  } catch (err) {
    response.err = err.message;
    res.status(500).json(response);
  }
};
