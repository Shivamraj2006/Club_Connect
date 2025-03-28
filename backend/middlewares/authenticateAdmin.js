import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_KEY;

const authenticateAdmin = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ message: "LOGIN FIRST" });
  }

  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    if (data.isAdmin === true) {
      next();
    } else {
      res.status(403).json({ message: "ACCESS DENIED. ADMIN ONLY" });
    }
  });
};

export { authenticateAdmin };
