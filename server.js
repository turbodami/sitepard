const express = require("express");
const connectDB = require("./config/db");
const subdomains = require('wildcard-subdomains');
const aws = require('aws-sdk');
const path = require('path');
const fs = require('fs');


const app = express();

//connect db
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//Declarations and parameters to access spaces


const s3 = new aws.S3(
  {
      endpoint: 'fra1.digitaloceanspaces.com',
      accessKeyId: 'JGDTMFZUJ4ZRBU53WMCQ',
      secretAccessKey: 'OnG8gclYu6L5oWFmxP073maaWGj4s1As8Z75fiA4G9E',
      bucket: 'cactus-space'
  }
);


//define subdomains
app.use(subdomains(
    {
      namespace: 's',
      whitelist: ['www']
    }
  ));


//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use('/api/siteSpaces', require('./routes/api/siteSpacesRoute'));
app.use("/api/site", require("./routes/api/siteDatabaseRoute"));
app.use("/api/payment", require("./routes/api/paymentsRoute"));
app.use("/api/webhook", require("./routes/api/webhookRoute"));


//Importo il template del sito

app.use(express.static('./templates/pizzeria/public/index.html'));


app.get("/", (req, res) => res.send("api running"));


//Serve static assets in production

if(process.env.NODE_ENV === 'production')
{
  //Set static folder 

  app.use(express.static('client/build'));

  app.get('*', (req,res) =>
  {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server ${PORT}`));
