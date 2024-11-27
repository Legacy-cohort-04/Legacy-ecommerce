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