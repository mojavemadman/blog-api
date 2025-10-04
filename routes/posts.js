import { Router } from "express";

const router = Router();

let posts = [{
            id : 4,
            title: "The laxidasical learner",
            content: "Here's how I mastered learning: have fun!",
            category: "Education",
            tags: ["learning", "lifestyle"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }];
let nextId = 1;

router.post("/", async (req, res) => {
    try {
        const { title, content, category, tags } =  req.body;
        const newPost = {
            id : nextId,
            title,
            content,
            category,
            tags,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        posts.push(newPost);
        nextId++;
        res.status(201).send(newPost);
    } catch (error) {
        console.error("Error creating post:", error)
    }
});

router.get("/", async (req, res) => {
    try {
    res.status(200).send(posts);
    } catch (error) {
        console.error("Error getting :", error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const post = posts.find(post => post.id === postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).send(post);
    } catch (error) {
        console.error("Error getting post:", error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        //Don't take id or createdAt to protect data
        const { title, content, category, tags } = req.body;
        const post = posts.find(post => post.id === postId);
        
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        //Filter for fields we allow to update & passed in body
        const allowedUpdates = { title, content, categories, tags};
        Object.keys(allowedUpdates).forEach(key => allowedUpdates[key] === undefined && delete allowedUpdates[key]);
        //Double spread syntax allows overwriting original post (PUTception!)
        const updatedPost = {
            ...post,
            ...allowedUpdates,
            updatedAt: new Date().toISOString()
        }
        posts[posts.indexOf(post)] = updatedPost;
        res.status(200).send(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const post = posts.find(post => post.id === postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found"});
        }

        const index = posts.indexOf(post);
        posts.splice(index, 1);

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting post:", error);
    }
})

export default router;