import { Router } from "express";
import Validate from "../services/validate.js"

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

        Validate.title(title);
        Validate.content(content);
        Validate.category(category);
        Validate.tags(tags);

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
        return res.status(400).send({ error: error.message })
    }
});

router.get("/", async (req, res) => {
    try {
    const term = req.query.term?.toLowerCase();
        if (term) {
            const filteredPosts = posts.filter(post => 
                post.title.toLowerCase().includes(term) ||
                post.content.toLowerCase().includes(term) ||
                post.category.toLowerCase().includes(term) ||
                post.tags.some(tag => tag.toLowerCase().includes(term))
            );
            return res.status(200).send(filteredPosts);
        } else {
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
        const post = posts.find(post => post.id === postId);

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
        //Each update field is optional; only validate if included in request body
        if (title) Validate.title(title);
        if (content) Validate.content(content);
        if (category) Validate.category(category);
        if (tags) Validate.tags(tags);

        const post = posts.find(post => post.id === postId);
        
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        //Filter for fields we allow to update & passed in body
        const allowedUpdates = { title, content, category, tags};
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
        return res.status(400).send({ error: error.message })
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
        return res.status(400).send({ error: error.message })
    }
})

export default router;