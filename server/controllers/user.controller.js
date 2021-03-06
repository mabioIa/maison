import User from "../models/user.model";
import extend from "lodash/extend";
import errorHandler from "../helpers/database.error.handler";

const create = async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  try {
    await user.save();
    return res.status(200).json({
      message: "Signed up successfully!",
    });
  } catch (e) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(e),
    });
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created");
    res.json(users);
  } catch (e) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(e),
    });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(400).json({
        error: "User not found!",
      });
    req.profile = user;
    next();
  } catch (e) {
    return res.status(400).json({
      error: "Could not retrieve user.",
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;

  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let user = req.profile;

    user = extend(user, req.body);
    user.updated = Date.now();

    await user.save();

    user.hashed_password = undefined;
    user.salt = undefined;

    res.json(user);
  } catch (e) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(e),
    });
  }
};

const remove = async (req, res, next) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();

    deletedUser.hashed_assword = undefined;
    deletedUser.salt = undefined;

    res.json(deletedUser);
  } catch (e) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(e),
    });
  }
};

export default { create, list, userByID, read, update, remove };
