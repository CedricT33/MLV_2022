const jwt = require("jsonwebtoken");
require('dotenv/config');

module.exports = function(req, res, next) {
    //get the token from the header if present
    const token = req.headers["x-auth-token"];
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send("Access denied. No token provided.");
  
    try {
      //if can verify the token, set req.token and pass to next middleware
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      req.token = decoded;
      next();
    } catch (ex) {
      //if invalid token
      res.status(400).send("Invalid token.");
    }
  };