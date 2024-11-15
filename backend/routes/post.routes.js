import express from "express";
import { authRoute } from "../middlewares/Auth/authRoute.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getLikedPosts,
  getUserPosts,
  likeUnlikePost,
} from "../controllers/post.controller.js";

const Router = express.Router();

Router.get("/all", authRoute, getAllPosts);
Router.get("/following", authRoute, getFollowingPosts);
Router.get("/user/:username", authRoute, getUserPosts);
Router.get("/likes/:id", authRoute, getLikedPosts);
Router.post("/create", authRoute, createPost);
Router.delete("/:id", authRoute, deletePost);
Router.post("/comment/:id", authRoute, commentOnPost);
Router.post("/like/:id", authRoute, likeUnlikePost);

export default Router;
