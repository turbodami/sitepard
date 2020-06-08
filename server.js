const express = require("express");
const connectDB = require("./config/db");
const subdomains = require("wildcard-subdomains");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const app = express();

//connect db
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//Declarations and parameters to access spaces

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

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/siteSpaces", require("./routes/api/siteSpacesRoute"));
app.use("/api/site", require("./routes/api/siteDatabaseRoute"));
app.use("/api/payment", require("./routes/api/paymentsRoute"));

//Subdomain that lets the user display a site with nameSite.cactusdomaindev.xyz

app.get("/s/:firstSubdomain/*", async (req, res) => {
  const url = String(req.params.firstSubdomain);
  try {
    const site = await Site.findOne({ domain: url });

    if (site) {
      const url = String(site.index);
      console.log(url);
      const arr = url.split(".com/");
      console.log(arr[1]);

      const s3Params = {
        Bucket: "cactus-space",
        Key: arr[1],
      };

      s3.getObject({ Key: arr[1], Bucket: "cactus-space" }, (err, data) => {
        if (!err) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data.Body, "utf-8");
        } else {
          console.log(err);
        }
      });
    } else {
      return res.status(404).json({ message: "Page not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/", (req, res) => res.send("api running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server ${PORT}`));
