import express, { Route } from "express";
import { authRoute } from "../middlewares/Auth/authRoute.js";
import {
  deleteNotification,
  deleteNotifications,
  getNotifications,
} from "../controllers/notifications.controller.js";

const Router = express.Router();

Router.get("/", authRoute, getNotifications);
Router.delete("/", authRoute, deleteNotifications);
Router.delete("/:id", authRoute, deleteNotification);

export default Router;
