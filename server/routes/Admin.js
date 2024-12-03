const express = require('express');
const { getAllUsers } = require('../controller/User');

const router = express.Router();

router.get('/allusers', getAllUsers);

module.exports = router;

