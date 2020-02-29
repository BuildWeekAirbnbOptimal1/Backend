const jwt = require('jsonwebtoken');
const secrets = require('./secrets');


module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (token) {
      
      jwt.verify(token, secrets.jwtSecret, (error, decodedJwt) => {
        if (error) {
          res.status(401).json({ message: "Unauthorized access, please try signing in again with a TOKEN" });
        } else {
          req.decodedJwt = decodedJwt;
          next();
        }
      });
    } else {
      res.status(401).json({ message: "Please sign in before proceeding" });
    }
  };
  