const {deletePost, getAllPosts, updatePost} = require("../controller/Posts")
const express = require("express")


const postRouter = express.Router()

postRouter.get("/allPost", getAllPosts);
postRouter.delete("/post/:postId", deletePost);
postRouter.put("/post/:postId", updatePost)


module.exports =  postRouter