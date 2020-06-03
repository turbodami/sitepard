const express = require('express');
const fileUpload = require('express-fileupload');
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

router.post('/:_id', async(req, res) =>
{

  console.log(req.params.domain);
  console.log(req.body.path);

  await spacesController.uploadSite(req.body.path, req.params._id);

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