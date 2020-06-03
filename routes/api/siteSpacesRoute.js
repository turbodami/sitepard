const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');

const spacesController = require("../../controllers/spacesController");

const s3 = new aws.S3(
    {
        endpoint: 'fra1.digitaloceanspaces.com',
        accessKeyId: 'JGDTMFZUJ4ZRBU53WMCQ',
        secretAccessKey: 'OnG8gclYu6L5oWFmxP073maaWGj4s1As8Z75fiA4G9E',
        bucket: 'cactus-space'
    }
);

router.post('/:domain', async(req, res) =>
{

  // console.log(req.params.domain);
  // console.log(req.body.path);


  await spacesController.uploadSite(req.body.path, req.params.domain);
  //spacesController.uploadSite(req.params.domain, )
  // const destination = 'users-sites/' + req.params.domain + ;
  // console.log(destination);

  // const params = 
  // {
  //   Bucket : "cactus-space",
    
  //   Key: destination,
  //   ContentType: "text/html",
  //   Body: page
  // }
  
  // s3.upload(params, (err, page) =>
  // {
  //   if(err)
  //   {
  //     console.log('Error in callback');
  //     console.log(err);
  //     res.status(500).send('Server error');
  //   }
  //   else
  //   {
  //     console.log('success');
  //     console.log(page);
  //     res.status(200).send('Nice');
  //   }
  // });
});

router.delete('/:destination', async(req, res) =>
{
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

})


module.exports = router;