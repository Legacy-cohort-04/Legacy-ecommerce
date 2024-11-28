const express = require("express");
const cors = require("cors");
const app = express();
<<<<<<< HEAD
const productsRoute = require("./routes/Products")


=======
const products =require("./routes/Products.js")
 const cartProducts=require("./routes/Cart.js")
>>>>>>> 06bd3910547b6292c498c0e11a7d7240c7207ba2


app.use(cors()); 
app.use(express.json());

const PORT = 3000;
<<<<<<< HEAD

require("./database/index.js")
app.use("/products", productsRoute);

=======
app.use("/cartP",cartProducts)
app.use('/products',products)
>>>>>>> 06bd3910547b6292c498c0e11a7d7240c7207ba2
require("./database/index.js")



app.use("/user" , userroute)



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });