const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors()); 
app.use(express.json());

<<<<<<< HEAD
require("./database/index.js")


const postRouter = require('./routes/Posts.js');
const commentRouter = require('./routes/Comments.js');
=======
const PORT = 3001;

require("./database/index.js")

const userroute = require("./routes/User.js")

>>>>>>> 4f79d34ee97349634c6d9f0bf43f910cdd515a6c

app.use("/user" , userroute)

app.use("/posts",postRouter);
app.use("/comments", commentRouter);

const PORT = 3001


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});