import express from "express";
import morgan from "morgan";
import router from "./routes/posts.js";
import "./db.js"

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use("/posts", router)

app.listen(8080, async () => {
    console.log("Server running on http://localhost:8080");
});