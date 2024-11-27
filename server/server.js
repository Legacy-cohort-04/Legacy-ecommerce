const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

require("./database/index.js")


const postRouter = require('./routes/Posts.js')
app.use("/posts",postRouter)

const PORT = 3001


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});