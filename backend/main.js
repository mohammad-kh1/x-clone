import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

import { dbConnect } from "./db/db.init.js";

morgan.token("id", (req) => {
  return req.id;
});
dotenv.config();
const app = express();

app.use(express.json());
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
