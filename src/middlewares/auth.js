const jwt = require("jsonwebtoken");

const { accessTokenSecret } = require("../config/config.js");

/**
 * Middleware to authenticate JWT Token
 * To understand how it works, read more on https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
 * or
 * https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
 */

const authenticateToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const user = jwt.verify(token, accessTokenSecret);
    req.user = user;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = authenticateToken;
