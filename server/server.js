const express = require("express");
const cors = require("cors");
const app = express();
const products =require("./routes/Products.js")
const cartProducts=require("./routes/Cart.js")


app.use(cors()); 
app.use(express.json());

const PORT = 3001;

require("./database/index.js")

app.use("/cartP",cartProducts)
app.use('/products',products)
app.use("/user" , userroute)
app.use("/posts",postRouter);
app.use("/comments", commentRouter);



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});