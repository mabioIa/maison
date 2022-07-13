import express from "express";
import authController from "../controllers/auth.controller";
import userController from "../controllers/user.controller";

const router = express.Router();

router.route("/api/users").get(userController.list).post(userController.create);

router
  .route("/api/users/:userId")
  .get(authController.requireLogin, userController.read)
  .put(
    authController.requireLogin,
    authController.hasAuthorization,
    userController.update
  )
  .delete(
    authController.requireLogin,
    authController.hasAuthorization,
    userController.remove
  );

router.param("userId", userController.userByID);

export default router;
