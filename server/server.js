const express = require("express");
const cors = require("cors");
const products =require("./routes/Products.js")
const cartProducts=require("./routes/Cart.js")
const postRouter = require('./routes/Posts.js');
const commentRouter = require('./routes/Comments.js');
const userroute = require('./routes/User.js');

const app = express();
app.use(cors()); 
app.use(express.json());

const PORT = 3000;

require("./database/index.js")

app.use("/cartP",cartProducts)
app.use('/products',products)
app.use("/user" , userroute)
app.use("/posts",postRouter);
app.use("/comments", commentRouter);



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});