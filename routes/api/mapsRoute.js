const express = require('express');
const request = require('request');
const router = express.Router();
const GeoCodeParser = require('google-geocode-parser');

router.get('/get-coordinates/:address', async (req ,res)=>
    {
        const reqPath = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.address + '&key=AIzaSyBzuwG7mCgetboELyoJBBPRCYzR00RaRsM';
        console.log(reqPath);
        try 
        {
            request.get(reqPath, (err, response, body) =>
            {
                if(err)
                {
                    console.log(err);
                    res.status(500).json({message: "Errore nella richiesta"});
                }
                else
                {
                    const parsed = new GeoCodeParser(JSON.parse(body));
                    res.status(200).json({lat : parsed.getLat(), lng: parsed.getLng()});
                }
            }); 
        }
         catch (error) 
        {
            console.log(error);
            res.status(500).json({message: "Errore nella richiesta"});
        }  
    }
);

module.exports = router;