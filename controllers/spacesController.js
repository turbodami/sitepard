const express = require('express');
const aws = require('aws-sdk');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');

const Site = require('../models/Site');

const s3 = new aws.S3(
  {
      endpoint: 'fra1.digitaloceanspaces.com',
      accessKeyId: 'JGDTMFZUJ4ZRBU53WMCQ',
      secretAccessKey: 'OnG8gclYu6L5oWFmxP073maaWGj4s1As8Z75fiA4G9E',
      bucket: 'cactus-space'
  }
);


exports.UploadSite = async(req, res) =>
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