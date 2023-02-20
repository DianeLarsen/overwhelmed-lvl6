import express from "express";
import path from "path";
import * as dotenv from "dotenv";

import morgan from "morgan";
import mongoose from "mongoose";
import { expressjwt } from "express-jwt";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
// import commentRoutes from "./routes/comments.js";
// import likeRoutes from "./routes/likes.js";
// import relationshipRoutes from "./routes/relationships.js";
import cors from "cors";

import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.set("view engine", "ejs");
if (process.env.NODE_ENV === "production") {
  // production mode
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server and DB is running on local port ${process.env.PORT} `
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/auth", authRoutes);
app.use(
  "/api",
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
);

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/likes", likeRoutes);
// app.use("/api/relationships", relationshipRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});
