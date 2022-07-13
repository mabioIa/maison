import config from "../config/config";
import expressJwt from "express-jwt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

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

const logout = (req, res) => {};
const requireLogin = {};
const hasAuthorization = (req, res) => {};

export default { login, logout, requireLogin, hasAuthorization };
