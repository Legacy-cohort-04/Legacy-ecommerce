const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

require("./database/index.js")


const postRouter = require('./routes/Posts.js');
const commentRouter = require('./routes/Comments.js');


app.use("/posts",postRouter);
app.use("/comments", commentRouter);

const PORT = 3001


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});