import express from "express";
import {
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { showUsers } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", protectRoute, showUsers);


export default router;
