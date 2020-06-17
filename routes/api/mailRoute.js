const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        // host: "smtp.office365.com",
        // port: "587",
        // secure: (String(config.port)==="587"),

        // auth:
        // {
        //     user : "admin@sitepard.com",
        //     pass : "572AHGhD3Rck"
        // },
        // tls:
        // {
        //     ciphers:'SSLv3'
        // }
        
        service: "outlook",
        auth: 
        {
            user: 'admin@sitepard.com',
            pass: '572AHGhD3Rck'
        }
        
    }
)

router.post('/verification/:recipient', async(req, res) =>
{
    try 
    {
        let test = await transporter.sendMail(
        {
            from: "Test Nicola",
            to: req.params.recipient,
            subject : "Prova",
            text: "Bello questo testo",
            html: "<b>Sciao belo </b>",
        },
        (err, info) =>
        {
            if(err)
            {
                console.log(err);
                res.status(500).json({message: "Errore nell'invio messaggio."});
            }
            else
            {
                console.log(info);
                res.status(200).json({message: "Messaggio inviato con successo."});
            }
        });
    }
    catch (error) 
    {
        console.log(error);
        res.status(500).json({message: "Errore invio mail"});
    }
});

module.exports = router;