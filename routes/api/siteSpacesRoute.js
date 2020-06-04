const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const Types = mongoose.Types;
const ObjectId = Types.ObjectId;

const Site = require('../../models/Site');


const spacesController = require("../../controllers/spacesController");

const s3 = new aws.S3(
    {
        endpoint: 'fra1.digitaloceanspaces.com',
        accessKeyId: 'JGDTMFZUJ4ZRBU53WMCQ',
        secretAccessKey: 'OnG8gclYu6L5oWFmxP073maaWGj4s1As8Z75fiA4G9E',
        bucket: 'cactus-space'
    }
);

router.post('/site/:_id', async(req, res) =>
{

  console.log(req.params.domain);
  console.log(req.body.path);

  await spacesController.uploadSite(req.body.path, req.params._id);

});

router.delete('/:destination', async(req, res) =>{

    const destination = 'users-sites/' + req.params.destination + '/index.html';
    const data = null;

    const params = 
    {
        Bucket: "cactus-space",
        Key : destination
    }

    s3.deleteObject(params, (err, data) =>
    {
        if(err)
        {
            console.log(err, err.stack);
        }
        else
        {
            console.log('Deleted');
        }
    });

});

const fileStorage = multer.diskStorage(
    {
        // destination: (req, file, cb) =>
        // {
        //     console.log(req.params._id);
        //     if(!fs.existsSync('sitesImages/' + req.params.id))
        //     {
        //         fs.mkdirSync(('sitesImages/' + req.params.id), {recursive: true});
        //     }
        //     cb(null, 'sitesImages/' + req.params.id)
        // },
        filename: (req, file,cb) =>
        {
            cb(null, req.params.fileName);
        }
    }
);

const filter = (req, file, cb) =>
{
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(null, false);

      };
}

const imageUpload = multer({storage: fileStorage, fileFilter: filter}, ).single('file');



router.post('/image/:id&:fileName', imageUpload, async (req, res) =>
{
    console.log(req.params.id);
    const id = req.params.id;
    
    if(!req.file)
    {
        res.status(500).json({message: 'Bad request'});
    }

    console.log(req.file);

    s3.putObject({
        Bucket: "cactus-space",
        Key: "users-sites/" + id + "/images/" + req.params.fileName,
        ContentType : file.mimetype,
        Body: req.file
      }, 
      (res) => {
        console.log(`Successfully uploaded '${req.params.fileName}'!`);
      });

    // try 
    // {
    //     const site = await Site.findByIdAndUpdate(id, (err, site) =>
    //     {
    //         if(err)
    //         {
    //             console.log(err);
    //         }
    //         else
    //         {
    //             return site;
    //         }
    // });
    // } catch (error) {
    //     res.status(500).json({message: 'Database error'});
    // }


    


    
});


module.exports = router;