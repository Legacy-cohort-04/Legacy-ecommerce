const {deletePost, getAllPosts, updatePost, createPost} = require("../controller/Posts")
const express = require("express")


const postRouter = express.Router()

postRouter.get("/allPost", getAllPosts);
postRouter.delete("/:postId", deletePost);
postRouter.put("/:postId", updatePost);
postRouter.post("/createPost", createPost);

module.exports = postRouter