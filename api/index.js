import express from "express";
const app = express();
import authroutes from "./routes/auth.js"
import userroutes from "./routes/users.js"
import postroutes from "./routes/posts.js"
import commentroutes from "./routes/comments.js"
import likeroutes from "./routes/likes.js"

//middleware
app.use(express.json())

app.use("/api/auth", authroutes)
app.use("/api/users", userroutes)
app.use("/api/posts", postroutes)
app.use("/api/comments", commentroutes)
app.use("/api/likes", likeroutes)


app.listen(9000, ()=>{
    console.log("API working")
});