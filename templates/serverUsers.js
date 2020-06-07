import path from "path";
import fs from "fs";
import React from "react";
import express from "express";
import connectDB from "../config/db";
import ReactDOMServer from "react-dom/server";
import subdomains from "wildcard-subdomains";
import aws from "aws-sdk";
import Pizzeria from "./pizzeria/src/App";
import Site from "../models/Site";

const app = express();

//connect db
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//declarations and parameters to access spaces
const s3 = new aws.S3({
  endpoint: "fra1.digitaloceanspaces.com",
  accessKeyId: "JGDTMFZUJ4ZRBU53WMCQ",
  secretAccessKey: "OnG8gclYu6L5oWFmxP073maaWGj4s1As8Z75fiA4G9E",
  bucket: "cactus-space",
});

//define subdomains
app.use(
  subdomains({
    namespace: "s",
    whitelist: ["www"],
  })
);

app.use("/api/siteSpaces", require("./routes/api/siteSpacesRoute"));

//Subdomain that lets the user display a site with nameSite.cactusdomaindev.xyz
app.get("/s/:firstSubdomain/*", async (req, res) => {
  const url = String(req.params.firstSubdomain);

  try {
    const site = await Site.findOne({ domain: url });
    const { category } = site;

    app.use(express.static(`./${category}/public`));

    if (site) {
      const url = String(site.index);
      console.log(url);
      const arr = url.split(".com/");
      console.log(arr[1]);

      switch (category) {
        case "pizzeria":
          const app = ReactDOMServer.renderToString(<Pizzeria />);
        default:
          const app = ReactDOMServer.renderToString(<h1>Dio minchia</h1>);
      }

      const indexFile = path.resolve(
        `./templates/${category}/public/index.html`
      );

      fs.readFile(indexFile, "utf8", (err, data) => {
        if (err) {
          console.error("Something went wrong:", err);
          return res.status(500).send("Oops, better luck next time!");
        }

        return res.send(
          data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
      });
    } else {
      return res.status(404).json({ message: "Page not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

//set port to listen to: stairway to heaven
const PORT = process.env.PORT || 42069;

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});
