const express = require("express");
const cors = require("cors");
const app = express();
const productsRoute = require("./routes/Products")




app.use(cors()); 
app.use(express.json());

const PORT = 3000;

require("./database/index.js")
app.use("/products", productsRoute);

require("./database/index.js")

const userroute = require("./routes/User.js")


app.use("/user" , userroute)



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });