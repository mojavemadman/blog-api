import pool from "../db.js";

class Post {
    static async create(title, content, category, tags) {
        const query = `
            INSERT INTO posts (title, content, category, tags)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        const result = await pool.query(query, [title, content, category, tags]);
        return result.rows[0];
    }

    static async findAll() {
        const query = `
        SELECT *
        FROM posts
        ORDER BY created_at DESC
        `;

        const result = await pool.query(query);
        return result.rows;
    }

    static async search(term) {
        const query = `
        SELECT * FROM posts
        WHERE title ILIKE $1
            OR content ILIKE $1
            OR category ILIKE $1
            OR $1 = ANY(tags)
        ORDER BY created_at DESC
        `;

        const result = await pool.query(query, [`%${term}%`]);
        return result.rows;
    }

    static async findById(id) {
        const query = `SELECT * FROM posts WHERE id = $1`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async update(id, updates) {
        const query = `
            UPDATE posts
            SET title = COALESCE($1, title),
                content = COALESCE($2, content),
                category = COALESCE($3, category),
                tags = COALESCE($4, tags)
            WHERE id = $5
            RETURNING *
        `;

        const result = await pool.query(query, [
            updates.title,
            updates.content,
            updates.category,
            updates.tag,
            id
        ]);
        return result.rows[0];
    }

    static async delete(id) {
        const query = `DELETE FROM posts WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

export default Post;