import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.route("/auth/login").post(authController.login);
router.route("/auth/logout").get(authController.logout);

export default router;
