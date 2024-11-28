const  express = require("express");
const  cors = require("cors");
const  app = express();
const  products =require("./routes/Products.js")
 const cartProducts=require("./routes/Cart.js")
 const postRouter = require('./routes/Posts.js');
const commentRouter = require('./routes/Comments.js');

const userroute = require('./routes/User.js')

app.use(cors()); 
app.use(express.json());


const PORT = 3001;

app.use("/cartP",cartProducts)
app.use('/products',products)


app.use("/user" , userroute)

app.use("/posts",postRouter);
app.use("/comments", commentRouter);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});