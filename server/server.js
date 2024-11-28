const express = require("express");
const cors = require("cors");
const app = express();
const products =require("./routes/Products.js")
 const cartProducts=require("./routes/Cart.js")

app.use(cors());
app.use(express.json());

const PORT = 3000;
app.use("/cartP",cartProducts)
app.use('/products',products)
require("./database/index.js")






app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });