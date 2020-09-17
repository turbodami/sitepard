const express = require('express');
const router = express.Router();
require('dotenv').config();
const cors = require("cors");

//const stripe= require("stripe")("");
const uuid = require("uuid/v4");

//middleware
router.use(express.json());
router.use(cors());

//routes
router.get('/', (req, res) => {
    res.send("It works");
})

module.exports = router;