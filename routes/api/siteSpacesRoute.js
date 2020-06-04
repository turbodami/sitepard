const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const fs = require('fs');

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
        destination: (req, file, cb) =>
        {
            console.log(req.params._id);
            if(!fs.existsSync('sitesImages/' + req.params._id))
            {
                fs.mkdirSync(('sitesImages/' + req.params._id), {recursive: true});
            }
            cb(null, 'sitesImages/' + req.params._id)
        },
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
    
    if(!req.file)
    {
        res.status(500).json({message: 'Bad request'});
    }
    else
    {
        res.status(200).json({message: 'File stored'});
    }

    const site = await Site.findById({id}, (err, site) =>
    {
        if(err)
        {console.log('Errore');}
        else
        {
            return site;
        }
    })


    console.log(site);
    
});


module.exports = router;