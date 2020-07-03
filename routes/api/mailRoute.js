const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
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
                user.registrationToken = null;
                user.save((err) =>
                {
                    if(err)
                    {
                        console.log(err);
                        return res.status(500).send({type: "db-error", msg: "Errore nell'aggiornamento dell'utente"});
                    }
                    else
                    {
                        res.status(200).redirect('http://localhost:3000/activation');
                    }
                })
            }
        }
    })
});

router.post('/passwordForgot/:recipient', async(req, res) =>
{
    try 
    {
        let test = await transporter.sendMail(
        {
            from: "admin@sitepard.com",
            to: req.params.recipient,
            subject : "Reset",
            html: `<center> <b>Caro ${req.params.recipient},</b>è stato richiesto il reset della password del tuo account. <br/> Clicca <a href="http://localhost:3000/passwordreset?token=${req.body.token}"> su questo link</a>  per cambiare la tua password.  </center>`,
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

router.post('/passwordReset/:token', async(req, res) =>  //Route che a partire dalla mail inviata dall'utente cambia la password dell'utente
{
    User.findOne({passwordResetToken : req.params.token}, (err, user) =>  //Cerca il token nella collezione degli utenti
    {
        if(err)
        {
            console.log(err);
            return res.status(500).send({type: "db-error", msg: "Errore sul database token"});
        }
        if(!user)
        {
            console.log('non trovato');
            return res.status(400).send({type: 'not-verified', msg: "Token non valido, impossibile cambiare password."});
        }
        else
        {   
            const salt = bcrypt.genSalt(10,(err, salt) => //Genera il sale (?)
            {
                if(err)
                {
                    console.log(err);
                    return res.status(500).json({message: `Errore nella generazione del salt`});
                }
                const hash = bcrypt.hash(req.body.password, salt, (err, hash) => //Cripta la password
                {
                    if(err)
                    {
                        console.log(err);
                        return res.status(500).json({message: `Errore nell'hashing`});
                    }
                    user.password = hash;
                    user.passwordResetToken = null; //Rende il token di reset nell'utente vuoto

                    user.save((err) =>
                    {
                        if(err)
                        {
                            console.log(err);
                            return res.status(500).json({message: `Errore nel salvataggio della password nel db`});
                        }
                        else
                        {
                            console.log('nice');
                            return res.status(200).json({message: `Password salvata con successo`});
                        }
                    });
                });
            });          
        }
    })
});

router.post('/passwordChanged/:recipient', async(req, res) =>
{
    try 
    {
        let test = await transporter.sendMail(
        {
            from: "admin@sitepard.com",
            to: req.params.recipient,
            subject : "Password modificata",
            html: `<center> <b>Salve</b> <br/> La informiamo che la sua password è stata cambiata con successo. <br/> Nel caso in cui lei non l'avesse cambiata la invitiamo a contattare l'assistenza.</center>`,
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



module.exports = router;