import express from "express";

import { login, signup, logout } from "../controllers/auth.controller.js";
import validateSignupInput from "../middlewares/Auth/signup.middleware.js";
import validateLoginInput from "../middlewares/Auth/login.middleware.js";

const Router = express.Router();

Router.post("/signup", validateSignupInput, signup);
Router.post("/login", validateLoginInput, login);
Router.post("/logout", logout);

export default Router;
