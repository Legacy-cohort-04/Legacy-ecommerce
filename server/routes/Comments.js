
const {deleteOneComment, postComment , getComments ,updateComment} = require('../controller/Comments')

const express = require("express")
const commentRouter = express.Router()


commentRouter.get("/allComments", getComments)
commentRouter.delete('/oneComment/:commID',deleteOneComment)
commentRouter.post('/oneComment/:postId',postComment)
commentRouter.put("/oneComment/:commID", updateComment)


module.exports = commentRouter