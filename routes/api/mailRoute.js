const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

// const transporter = nodemailer.createTransport(
//     {
//         host: "smtp.office365.com",
//         port: "587",
//         auth:
//         {
//             user : "admin@sitepard.com",
//             pass : "572AHGhD3Rck"
//         }
//         tls:
//         {
//             ciphers:'SSLv3'
//         }
        
//         service: "Hotmail",
//         auth: 
//         {
//             user: 'admin@sitepard.com',
//             pass: '572AHGhD3Rck'
//         }
        
//     }
// )

router.post('/verification/:recipient', async(req, res) =>
{
    // try 
    // {
    //     let test = await transporter.sendMail(
    //     {
    //         from: "admin@sitepard.com",
    //         to: req.params.recipient,
    //         subject : "Prova",
    //         text: "Bello questo testo",
    //         html: "<b>Sciao belo </b>",
    //     },
    //     (err, info) =>
    //     {
    //         if(err)
    //         {
    //             console.log(err);
    //             res.status(500).json({message: "Errore nell'invio messaggio."});
    //         }
    //         else
    //         {
    //             console.log(info);
    //             res.status(200).json({message: "Messaggio inviato con successo."});
    //         }
    //     });
    // }
    // catch (error) 
    // {
    //     console.log(error);
    //     res.status(500).json({message: "Errore invio mail"});
    // }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = 
    {
        to: 'test@example.com',
        from: 'test@example.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    try 
    {
        await sgMail.send(msg);
    } 
    catch (err) 
    {
        console.log(err);

        if(err.response)
        {
            console.error(err.response.body);
        }
    }

});

module.exports = router;