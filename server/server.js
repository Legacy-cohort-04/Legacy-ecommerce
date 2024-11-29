const express = require("express");
const cors = require("cors");
const app = express();
const products =require("./routes/Products.js")
 const cartProducts=require("./routes/Cart.js")
 const userroute=require("./routes/User.js")


app.use(cors()); 
app.use(express.json());

const PORT = 3001;
app.use("/cartP",cartProducts)
app.use('/products',products)
require("./database/index.js")



app.use("/user" , userroute)



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });