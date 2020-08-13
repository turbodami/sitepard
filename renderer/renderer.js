const express = require("express");
const path = require("path");
const subdomains = require("wildcard-subdomains");
const aws = require("aws-sdk");
const Site = require("./models/Site");
const connectDB = require("./config/db");
require('dotenv').config();

const PORT = parseInt(process.env.PORT, 10) || 42069;

//connect db
connectDB();

const server = express();

//load view engine
server.set("view engine", "pug");
server.set("views", path.join(__dirname, "views"));

//set public folder
server.use(express.static(path.join(__dirname, "public")));

//init middleware
server.use(express.json({ extended: false }));

//declarations and parameters to access spaces
const s3 = new aws.S3({
  endpoint: "fra1.digitaloceanspaces.com",
  accessKeyId: "JGDTMFZUJ4ZRBU53WMCQ",
  secretAccessKey: "OnG8gclYu6L5oWFmxP073maaWGj4s1As8Z75fiA4G9E",
  bucket: "cactus-space",
});

//define subdomains
server.use(
  subdomains({
    namespace: "s",
    whitelist: ["www"],
  })
);

//Subdomain that lets the user display a site with nameSite.cactusdomaindev.xyz

server.get("/s/:firstSubdomain/*", async (req, res) => {
  const url = String(req.params.firstSubdomain);
  try {
    const site = await Site.findOne({ subdomain: url });

    const {
      category,
      name,
      description,
      logo,
      image,
      categories,
      products,
      address,
      timeTable,
      whatsappNumber,
      tel
    } = site;
    console.log(timeTable);

    if (site) {
      switch (category) {
        case "pizzeria":
          
          return res.render("index", {
            name: name,
            category: category,
            description: description,
            logo: logo,
            image: image,
            categories: categories,
            products: products,
            address: address,
            whatsappNumber: whatsappNumber,
            tel: tel,
            timeTable: timeTable
          });
      }
    } else {
      return res.status(404).json({ message: "Page not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

server.get('*', async(req,res) =>
{
  //res.status(200).json({msg: `${req.get('host')}`});

  const url = String(req.get.host);
  console.log(url);
  try {
    const site = await Site.findOne({ domain: url });

    const {
      category,
      name,
      description,
      logo,
      image,
      categories,
      products,
      address,
      timeTable,
      whatsappNumber,
      tel
    } = site;
    console.log(timeTable);

    if (site) {
      switch (category) {
        case "pizzeria":
          
          return res.render("index", {
            name: name,
            category: category,
            description: description,
            logo: logo,
            image: image,
            categories: categories,
            products: products,
            address: address,
            whatsappNumber: whatsappNumber,
            tel: tel,
            timeTable: timeTable
          });
      }
    } else {
      return res.status(404).json({ message: "Page not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

server.listen(PORT, () => console.log(`server ${PORT}`));
