
const {deleteOneComment, postComment , getCommentsByPost ,updateComment} = require('../controller/Comments')

const express = require("express")
const commentRouter = express.Router()


commentRouter.get("/allComments/:postId", getCommentsByPost)
commentRouter.delete('/oneComment/:commID',deleteOneComment)
commentRouter.post('/oneComment/:postId',postComment)
commentRouter.put("/oneComment/:commID", updateComment)


module.exports = commentRouter