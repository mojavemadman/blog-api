import express from "express";

const app = express();

app.listen(8080, async () => {
    console.log("Server running on http://localhost:8080");
});