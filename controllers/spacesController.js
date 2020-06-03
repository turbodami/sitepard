const express = require('express');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const Site = require('../models/Site');

const s3 = new aws.S3(
  {
      endpoint: 'fra1.digitaloceanspaces.com',
      accessKeyId: 'JGDTMFZUJ4ZRBU53WMCQ',
      secretAccessKey: 'OnG8gclYu6L5oWFmxP073maaWGj4s1As8Z75fiA4G9E',
      bucket: 'cactus-space'
  }
);


exports.UploadFile = async(req, res) =>
{
  const page = String(req.body);
  const destination = 'users-sites/' + req.params.destination + '/index.html';
  console.log(destination);

  const params = 
  {
    Bucket : "cactus-space",
    
    Key: destination,
    ContentType: "text/html",
    Body: page
  }
  
  s3.upload(params, (err, page) =>
  {
    if(err)
    {
      console.log('Error in callback');
      console.log(err);
      res.status(500).send('Server error');
    }
    else
    {
      console.log('success');
      console.log(page);
      res.status(200).send('Nice');
    }
  });
};

exports.downloadSite = async (req, res) =>
{
  const url = String(req.params.firstSubdomain);
  try 
  {
    const site = await Site.findOne({domain : url});
    const index = String(site.index);
    const arr =  index.split('.com');
    console.log(arr[1]);
    

    if(site)
    {
      //return res.redirect(site.index);
      
      const s3Params =
      {
          Bucket: 'cactus-space',
          Key: "/users-sites/adele/index.html"
      };

      s3.getObject(s3Params, (err, data) =>
      {
          if(!err)
          {
              console.log(data.body);
              return res.send('Success');
          }
      });

    }
    else
    {
      return res.status(404).json({message: 'Page not found'});
    }

  } 
  catch (error) 
  {
    res.status(500).json({message: "Server error"});
  }
  
  //res.send('It works');
};

exports.uploadSite = async (folderPath, _id) =>
{
  fs.readdir(folderPath, (err, files) =>
  {
    if(!files || files.length === 0) {
      console.log(`provided folder '${folderPath}' is empty or does not exist.`);
      console.log('Make sure your project was compiled!');
      return;
    }

    for (const fileName of files) {

      // get the full path of the file
      const filePath = path.join(folderPath, fileName);
      
      // ignore if directory
      if (fs.lstatSync(filePath).isDirectory()) {
        continue;
      }
  
      // read file contents
      fs.readFile(filePath, (error, fileContent) => {
        // if unable to read file contents, throw exception
        if (error) { throw error; }

        const extension = path.extname(filePath);
        let contentType = "application/octet-stream";

        switch(extension)
        {
          case ".html": 
            contentType = "text/html";
            break;
          
          case ".css":
            contentType = "text/css";
            break;

          case ".js":
            contentType = "application/javascript"
            break;
        }
        
        //upload file to S3

        s3.putObject({
          Bucket: "cactus-space",
          Key: "users-sites/" + _id + "/" + fileName,
          ContentType : contentType,
          Body: fileContent
        }, 
        (res) => {
          console.log(`Successfully uploaded '${fileName}'!`);
        });
        
      });
    }
  });
  
  console.log(_id);

  // try 
  // {
  //   Site.updateOne({domain: this.domain}, {$set: {index : "https://cactus-space.fra1.digitaloceanspaces.com/users-sites/" + domain+ "/index.html" }}, (err) =>
  //   {

  //   });  
  // } catch (error) 
  // {
  //   console.log(error);
  // }
  
};