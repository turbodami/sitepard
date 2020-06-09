const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

const subdomains = require("wildcard-subdomains");
const aws = require("aws-sdk");
const Site = require("./models/Site");
const connectDB = require("./config/db");

const PORT = parseInt(process.env.PORT, 10) || 42069;

//connect db
connectDB();

app
  .prepare()
  .then(() => {
    const server = express();

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
    const site = await Site.findOne({ domain: url });

    if (site) {
      return server.render(req, res, '/index', {diocan: "porcodio"});


    } else {
      return res.status(404).json({ message: "Page not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, () => console.log(`server ${PORT}`));

  }).catch((err) => {
    console.error(`Server failed to start: ${err.stack}`);
    process.exit(1);
  });
