const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
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

// router.post('/site/:_id', async(req, res) =>
// {

//   console.log(req.params.domain);
//   console.log(req.body.path);

//   await spacesController.uploadSite(req.body.path, req.params._id);

// });

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

const imageUpload = multer({
    storage: multerS3(
        {
            s3: s3,
            bucket: 'cactus-space',
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) =>
            {
                cb(null, 'users-sites/' + req.params.subdomain + '/images/' + req.params.fileName)
            }
        }
    )
});



router.post('/image/:subdomain&:fileName', imageUpload.single('file'), async (req, res) =>
{
    
    if(!req.file)
    {
        res.status(500).json({message: 'Bad request'});
    }
    else 
    {
        try 
        {
            console.log('go');
            const site = await Site.findOneAndUpdate({subdomain: req.params.subdomain},{$set: {images: {name: req.params.fileName, link: 'https://cactus-space.fra1.digitaloceanspaces.com/users-sites/'+ req.params.subdomain + '/images/' + req.params.fileName, pathS3:'user-sites/' + req.params.subdomain + '/images/' + req.params.fileName}}}, (err, site) =>
            {
                if(err || !site)
                {
                    console.log(err);
                    return res.status(500).json({message: `Errore su mongodb`});
                }
                else
                {
                    console.log(site);
                    return res.status(200).json('Upload successfull.');
                }
        });
        } 
        catch (error) 
        {
            console.log('errore database');
            res.status(500).json({message: 'Database error'});
        }
        
    }
    // else
    // {
    //     return res.status(200).json({message: `Immagine caricata`});
    // } 
});

// const imageTempUpload = multer({
//     storage: multerS3(
//         {
//             s3: s3,
//             bucket: 'cactus-space',
//             acl: 'public-read',
//             contentType: multerS3.AUTO_CONTENT_TYPE,
//             key: (req, file, cb) =>
//             {
//                 cb(null, 'users-sites/' + req.params.domain + '/images/' + req.params.fileName)
//             }
//         }
//     )
// });

// router.post('/imageTemp/:fileName', imageTempUpload.single('file'), async (req, res) =>
// {
    
//     if(!req.file)
//     {
//         res.status(500).json({message: 'Bad request'});
//     }
//     else
//     {
//         res.status(200).json('Upload successfull.');
//     } 
// });



module.exports = router;