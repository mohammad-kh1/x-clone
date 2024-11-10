import express from "express";

import { login, signup, logout } from "../controllers/auth.controller.js";
import validateUserInput from "../middlewares/Auth/signup.middleware.js";

const Router = express.Router();

Router.post("/signup", validateUserInput, signup);
Router.post("/login", login);
Router.post("/logout", logout);

export default Router;
