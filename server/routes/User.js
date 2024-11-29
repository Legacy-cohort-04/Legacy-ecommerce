
const {signup,login,getAllUsers } = require("../controller/User.js")
const express = require("express")

const userroute = express.Router()


userroute.post("/signup" , signup)
userroute.post("/login",login)
userroute.get("/all", getAllUsers);



module.exports = userroute