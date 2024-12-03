const express = require("express");
const cors = require("cors");
const app = express();
const products =require("./routes/Products.js")

const cartProducts=require("./routes/Cart.js")
const brandsroute = require("./routes/Brands.js")

const userroute=require('./routes/User.js')
const postRouter=require('./routes/Posts.js')
const commentRouter=require('./routes/Comments.js')
const admin = require("./routes/Admin.js");


app.use(cors());
app.use(express.json());

require("./database/index.js")


const PORT = process.env.PORT || 3001;

app.use("/brands",brandsroute)
app.use("/cartP",cartProducts)
app.use('/products',products)
app.use("/user" , userroute)
app.use("/posts",postRouter)
app.use("/comments", commentRouter)
app.use("/admin",admin)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});