
const {signup,login,getAllUsers ,updateUser, updateUserImage, getOneUser } = require("../controller/User.js")

const express = require("express")

const userroute = express.Router()


userroute.post("/signup" , signup)
userroute.post("/login",login)
userroute.get("/all", getAllUsers);

userroute.put("/updateuser/:id" , updateUser)
userroute.put("/userImage/:id", updateUserImage)
userroute.get("/oneUser/:id", getOneUser)


module.exports = userroute