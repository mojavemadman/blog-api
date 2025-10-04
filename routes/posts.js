import { Router } from "express";
import Validate from "../services/validate.js"
import Post from "../models/Post.js"

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { title, content, category, tags } =  req.body;

        Validate.title(title);
        Validate.content(content);
        Validate.category(category);
        Validate.tags(tags);

        const newPost = await Post.create(title, content, category, tags)
        res.status(201).send(newPost);
    } catch (error) {
        console.error("Error creating post:", error)
        return res.status(400).send({ error: error.message })
    }
});

router.get("/", async (req, res) => {
    try {
    const term = req.query.term;
        if (term) {
            const filteredPosts = await Post.search(term);
            return res.status(200).send(filteredPosts);
        } else {
        const posts = await Post.findAll();
        res.status(200).send(posts);
        }
    } catch (error) {
        console.error("Error getting :", error);
        return res.status(400).send({ error: error.message })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        res.status(200).send(post);
    } catch (error) {
        console.error("Error getting post:", error);
        return res.status(400).send({ error: error.message })
    }
});

router.put("/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        //Don't take id or createdAt to protect data
        const { title, content, category, tags } = req.body;
        const updates = { title, content, category, tags };

        //Each update field is optional; only validate if included in request body
        if (title) Validate.title(title);
        if (content) Validate.content(content);
        if (category) Validate.category(category);
        if (tags) Validate.tags(tags);

        const updatedPost = await Post.update(postId, updates);
        
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).send(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        return res.status(400).send({ error: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const post = await Post.delete(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found"});
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(400).send({ error: error.message })
    }
})

export default router;