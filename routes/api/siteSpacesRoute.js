const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');

const fileStorage = multer.diskStorage(
    {
        destination: (req, file, cb) =>
        {
            cb(null, 'storage')
        },
        filename: (req, file,cb) =>
        {
            cb(null, file.originalname);
        }
    }
);


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



router.post('/image/:_id', imageUpload, async (req, res) =>
{
    
    if(!req.file)
    {
        res.status(500).json({message: 'Bad request'});
    }
    else
    {
        //console.log(req.file);
        res.status(200).json({message: 'File stored'});
    }

    // console.log(req.files);
    // if(req.files === null)
    // {
    //     return res.status(400).json({msg: 'No file uploaded'});
    // }

    // const file = req.files.file;

    // file.mv(`${__dirname}/client/public/uploads/${file.name}`, err =>
    // {
    //     if(err)
    //     {
    //         console.log(err);
    //         return res.status(500).send(err);
    //     }

    //     res.json({filename: file.name, filePath: `/uploads/${file.name}`});
    // });
});


module.exports = router;