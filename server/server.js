const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors()); 
app.use(express.json());

const PORT = 3000;

require("./database/index.js")






app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });