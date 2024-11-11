import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

import { dbConnect } from "./db/db.init.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});
morgan.token("id", (req) => {
  return req.id;
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  morgan(":id :method :url :status :res[content-length] - :response-time ms")
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`server run at ${PORT}`);
  dbConnect();
});
