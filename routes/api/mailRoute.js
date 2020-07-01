const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const transporter = nodemailer.createTransport(
    {

        service: "Outlook365",
        auth: 
        {
            user: 'admin@sitepard.com',
            pass: 'J8OJEbi8Hmw8'
        }
        
    }
)

router.post('/verification/:recipient', async(req, res) =>
{
    try 
    {
        let test = await transporter.sendMail(
        {
            from: "admin@sitepard.com",
            to: req.params.recipient,
            subject : "Verifica",
            html: `<center> <b>Benvenuto in Sitepard!</b> <br/> Clicca <a href="http://localhost:5000/api/mail/verification/${req.body.token}"> su questo link</a>  per verificare la tua e-mail   </center>`,
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

router.get('/verification/:token', async(req, res) =>
{
    User.findOne({registrationToken : req.params.token}, (err, user) =>
    {
        if(err)
        {
            console.log(err);
            return res.status(500).send({type: "db-error", msg: "Errore sul database token"});
        }
        if(!user)
        {
            return res.status(400).send({type: 'not-verified', msg: "Token non valido, impossibile verificare utente."});
        }
        else
        {
            if(user.verified)
            {
                return res.status(400).send({type: "already-verified", msg: "Utente già verificato"});
            }
            else
            {
                user.verified = true;
                user.save((err) =>
                {
                    if(err)
                    {
                        console.log(err);
                        return res.status(500).send({type: "db-error", msg: "Errore nell'aggiornamento dell'utente"});
                    }
                    else
                    {
                        res.status(200).send(`L'account ${user.email} verificato.`);
                    }
                })
            }
        }
    })
});

module.exports = router;