import express from "express";
import { authRoute } from "../middlewares/Auth/authRoute.js";
import { createPost, deletePost } from "../controllers/post.controller.js";

const Router = express.Router();

Router.post("/create", authRoute, createPost);
Router.delete("/delete/:id", authRoute, deletePost);
// Router.post("/like/:id", authRoute, likeUnlikePost);
// Router.post("/comment/:id", authRoute, commentOnPost);

export default Router;
