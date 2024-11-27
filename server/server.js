const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/User");
const app = express();
const products =require("./routes/Products.js")
 const favorite=require("./routes/Favourites.js")
 const cartProducts=require("./routes/CartProducts.js")

app.use(cors());
app.use(express.json());

const PORT = 3000;
app.use("/cartP",cartProducts)
app.use("/favorite",favorite)
app.use('/products',products)
app.use("/api/users", userRoute)
require("./database/index.js")

const adminCreateRoute=require('./routes/Admin.js')

app.use('/admin',adminCreateRoute)




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });