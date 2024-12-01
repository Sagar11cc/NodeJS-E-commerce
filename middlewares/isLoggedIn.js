import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    res.status(401).json({
      msg: "No token, authorization denied",
    });

  }

  // verify token
  const decoded = verifyToken(token);

  if (!decoded) {
    throw new Error("Token expired/invalid");
  }

  // save the user to req.user
  req.userAuthId = decoded?.id;

  next();
};
