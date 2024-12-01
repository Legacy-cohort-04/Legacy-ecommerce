const db = require("../database/index");

const getAllPosts = async (req, res) => {
  const {id} = req.params
    try {
        const posts = await db.posts.findAll({
          where: {
            UserID: id
          }
        });
        
        res.send(posts); 
    } catch (error) {
        console.error("Error fetching questions:", error); 
        res.status(500).send(error);  
    }
  };
  
    const deletePost = async (req, res) => {
      try {
        const { postId } = req.params;
        await db.posts.destroy({
          where: { id: postId }
        });

        console.log("product with id =", postId, "is deleted ")
        res.send("Post Deleted");
      } catch (error) {
        res.status(500).send(error.message);
      }
    };
  
    const updatePost = async (req, res) => {
      try {
          const { content, image, UserId } = req.body;
          const { postId } = req.params; 
  
          const updatedPost = await db.posts.update(
              { content, image ,UserId },
              { where: { id: postId } }
          );
  
          res.send(updatedPost);
      } catch (error) {
          res.send(error);
      }
  }


  const createPost = async (req, res)  => {
    const {content, image, UserId} = req.body
    try {
       const creating = await db.posts.create( 
        {
            content: content, 
            image: image,
            UserId: UserId
        }
       )
       res.json(creating);
       console.log("creating post", creating);
    } catch (err) {
        console.log(err)
        res.status(500).send("error creating post: ", err)
    }
  }


module.exports = {deletePost, getAllPosts, updatePost ,createPost}