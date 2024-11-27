const {deletePost, getAllPosts, updatePost, createPost} = require("../controller/Posts")
const express = require("express")


const postRouter = express.Router()

postRouter.get("/allPost", getAllPosts);
postRouter.delete("/post/:postId", deletePost);
postRouter.put("/post/:postId", updatePost)
postRouter.post("/createPost", createPost)


module.exports =  postRouter