export default class Validate {
    static title(title) {
        if (!title) {
            throw new Error("A title is required");
        }

        if (typeof title !== "string") {
            throw new Error("Invalid title data type");
        }

        if (title.length > 50) {
            throw new Error("Title is too long (max length 50 chars)");
        }

    }

    static content(content) {
        if (!content) {
            throw new Error("The post has no content");
        }

        if (typeof content !== "string") {
            throw new Error("Invalid content data type");
        }

        if (!/[a-zA-Z]/.test(content)) {
            throw new Error("Please enter letters in the post")
        }

        if (content.length < 50) {
            throw new Error("The post is too short (min length 50 chars)");
        }
    }

    static category(category) {
        if (!category) {
            throw new Error("The post has no category");
        }

        if (typeof category !== "string") {
            throw new Error("Invalid category data type")
        }

        if (category.length > 15) {
            throw new Error("Category is too long (max length 15 chars)");
        }
    }

    static tags(tags) {
        if (!Array.isArray(tags)) {
            throw new Error("Invalid tags data type")
        }

        if (!tags.every(tag => typeof tag === "string")) {
            throw new Error("One or more tag is an invalid data type")
        }
    }
}
