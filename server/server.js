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

<<<<<<< HEAD
const PORT = 3000;
<<<<<<< HEAD

require("./database/index.js")
app.use("/products", productsRoute);

=======
app.use("/cartP",cartProducts)
app.use('/products',products)
>>>>>>> 06bd3910547b6292c498c0e11a7d7240c7207ba2
=======
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 7033b683f63cc2d0f382f8153f98d99463109c67
require("./database/index.js")


const postRouter = require('./routes/Posts.js');
const commentRouter = require('./routes/Comments.js');
=======
const PORT = 3001;

=======
const PORT = 3000;
app.use("/cartP",cartProducts)
app.use('/products',products)
>>>>>>> 06bd3910547b6292c498c0e11a7d7240c7207ba2
require("./database/index.js")


>>>>>>> 4f79d34ee97349634c6d9f0bf43f910cdd515a6c

app.use("/user" , userroute)

app.use("/posts",postRouter);
app.use("/comments", commentRouter);

const PORT = 3001


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});