import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

function verifyRequest(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        res.status(401).send("Unauthorised");
      }
      next();
    });
  } else {
    res.status(401).send("Unauthorised");
  }
}

function isUser(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        res.status(401).send("Unauthorised");
      }
      // check role here
      next();
    });
  } else {
    res.status(401).send("Unauthorised");
  }
}

export { verifyRequest };
