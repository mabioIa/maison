import config from "../config/config";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const { expressjwt: expressJwt } = require("express-jwt");

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User not found!" });
    if (!user.authenticate(req.body.password)) {
      return res
        .status(401)
        .send({ error: "Email and password do not match." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    return res.status(401).json({ error: "Cannot log in. Please try again." });
  }
};

const logout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Logged out",
  });
};

const requireLogin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["RS256"],
});

const hasAuthorization = (req, res, next) => {
  if (!(req.profile && req.auth && req.profile._id == req.auth._id)) {
    return res.status(403).json({
      error: "User is not authorized.",
    });
  }

  next();
};

export default { login, logout, requireLogin, hasAuthorization };
