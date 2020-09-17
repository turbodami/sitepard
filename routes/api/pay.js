const express = require('express');
const app = express.Router();
require('dotenv').config();
const cors = require("cors");

//const stripe= require("stripe")("");
const uuid = require("uuid/v4");

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get('/', (req, res) => {
    res.send("It works");
})