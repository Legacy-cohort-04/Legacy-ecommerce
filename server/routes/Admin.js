const express = require('express');
const { getAllUsers , deleteUser} = require('../controller/Admin');

const router = express.Router();

router.get('/allusers', getAllUsers);
router.delete('/user/:id', deleteUser);

module.exports = router;