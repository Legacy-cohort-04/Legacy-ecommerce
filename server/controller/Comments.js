const db = require("../database/index");

 /// to show all the comments that belong to a certain post 
 const getComments= async (req, res) => {
    try {
      const comment = await db.comments.findAll() 
      res.send(comment);
    } catch (error) {
      console.error("Error fetching comment:", error);
      res.status(500).send(error);
      }
}


/// I want to post a comment to each post 
const postComment = async (req,res) => {
    try {
        const {content} = req.body 
        const {postId} = req.params
        const post = await db.comments.create({
          content: content,
          postId: postId
      },
      {where: {postId: postId}}
    )
      res.status(200).send(post)
    } catch(err) {
      console.log(err)
    }
}


////// delete comment by its id 


const deleteOneComment = async (req, res) => {
    try {
        const {commID} = req.params
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
    const {content, UserId, postId } = req.body
    const {commID} = req.params
    console.log("commID: ", commID)
   const result =  await db.comments.update(
        {
          content,
          UserId,
          postId
        }, 
        {where : {id: commID}}
    )
    res.send("comment updated")

} catch(err) {
    console.log(err)
    res.send(err)
}

}

module.exports = {deleteOneComment, postComment , getComments, updateComment}