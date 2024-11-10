import express from "express";

import {
  login,
  signup,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import validateSignupInput from "../middlewares/Users/signup.middleware.js";
import validateLoginInput from "../middlewares/Users/login.middleware.js";
import { authRoute } from "../middlewares/Auth/authRoute.js";

const Router = express.Router();

Router.get("/me", authRoute, getMe);
Router.post("/signup", validateSignupInput, signup);
Router.post("/login", validateLoginInput, login);
Router.post("/logout", logout);

export default Router;
