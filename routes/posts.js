import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
    try {
        res.send("Create post route");
    } catch (error) {
        console.error("Error creating post:", error)
    }
});

router.get("/", async (req, res) => {
    try {
    res.send("Get all  route");
    } catch (error) {
        console.error("Error getting :", error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        res.send(`Get post ${postId} route`);
    } catch (error) {
        console.error("Error getting post:", error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        res.send(`Update post ${postId} route`);
    } catch (error) {
        console.error("Error updating post:", error);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        res.send(`Delete post ${postId} route`);
    } catch (error) {
        console.error("Error deleting post:", error);
    }
})

export default router;