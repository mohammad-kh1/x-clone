import express from "express";
import { authRoute } from "../middlewares/Auth/authRoute.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  likeUnlikePost,
} from "../controllers/post.controller.js";

const Router = express.Router();

Router.post("/create", authRoute, createPost);
Router.delete("/delete/:id", authRoute, deletePost);
Router.post("/comment/:id", authRoute, commentOnPost);
Router.get("/like/:id", authRoute, likeUnlikePost);

export default Router;
