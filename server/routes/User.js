
const {signup,login } = require("../controller/User.js")
const express = require("express")

const userroute = express.Router()


userroute.post("/signup" , signup)

userroute.post("/login",login)


module.exports = userroute