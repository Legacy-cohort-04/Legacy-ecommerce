const db = require("../database/index");

 /// to show all the comments that belong to a certain post 
 const getCommentsByPost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const comment = await db.comments.findAll({
        where: { postId: postId }
      });    
      res.send(comment);
    } catch (error) {
      console.error("Error fetching comment:", error);
      res.status(500).send(error);
      }
}



/// I want to post a comment to each post 
const postComment = async (req,res) => {
    try {
        const {content, UserId, postId} = req.body 
      const post = await db.comments.create({
        content: content,
        UserId: UserId, 
        postId: postId
      })
      res.status(200).send(post)
    } catch(err) {
      console.log(err)
    }
}


////// delete comment by its id 


const deleteOneComment = async (req, res) => {
    try {
        const {commID} = req.params
        console.log("commID delete", commID)
        const result =   await db.comments.destroy({
          where: {id:commID}
        })
        res.send("comment deleted ")

    } catch(err) {
      console.log(err)
      res.send(err)
    }
}


const updateComment = async (req, res) => {
try {
    const {content} = req.body
    const {commID} = req.params
    console.log("commID: ", commID)
   const result =  await db.comments.update(
        {content}, 
        {where : {commID}}
    )
    res.status(200).send("comment updated")

} catch(err) {
    console.log(err)
}

}

module.exports = {deleteOneComment, postComment , getCommentsByPost, updateComment}