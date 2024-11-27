const db = require("../database/index");

const getAllPosts = async (req, res) => {
    try {
        const posts = await db.posts.findAll();
        
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
        res.send("Post Deleted");
      } catch (error) {
        res.status(500).send(error.message);
      }
    };
  
    const updatePost = async (req, res) => {
      try {
          const { content, image } = req.body;
          const { postId } = req.params; 
  
          const updatedPost = await db.posts.update(
              { content, image },
              { where: { id: postId } }
          );
  
          res.send(updatedPost);
      } catch (error) {
          res.send(error);
      }
  }


  const createPost = async (req, res)  => {
    const {content , image} = req.body
    try {
       const creating = await db.posts.create( 
        {
            content: content, 
            image: image
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