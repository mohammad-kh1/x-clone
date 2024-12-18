import express from "express";
import { authRoute } from "../middlewares/Auth/authRoute.js";
import {
  followUnFollowUser,
  getUserProfile,
  getSuggestedUsers,
  updateUserProfile,
} from "../controllers/user.contrller.js";

const Router = express.Router();

Router.get("/profile/:username", authRoute, getUserProfile);
Router.get("/suggested", authRoute, getSuggestedUsers);
Router.post("/follow/:id", authRoute, followUnFollowUser);
Router.post("/update", authRoute, updateUserProfile);

export default Router;
