import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_KEY;

const authenticateLogin = (req, res, next) => {
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies.authToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided. Please log in." });
  }

  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    res.locals.user = data;
    next();
  });
};

export { authenticateLogin };
