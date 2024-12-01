import jwt, { decode } from "jsonwebtoken";
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return "token expired/invalid";
    } else {
      return decoded;
    }
  });
};
