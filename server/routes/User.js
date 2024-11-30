
const {signup,login, updateUser } = require("../controller/User.js")
const express = require("express")

const userroute = express.Router()


userroute.post("/signup" , signup)

userroute.post("/login",login)
userroute.put("/updateUser/:id" , updateUser)


module.exports = userroute