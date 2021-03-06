const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const bodyParser = require('body-parser');
const moment = require('moment');
const User = require("../../models/User");

router.get('/customer/:id', async(req, res) => //Ritorna i dati di un utente con l'id specificato
{
    try 
    {   
        stripe.customers.retrieve(req.params.id, (err, customer)=>
        {
            if(err)
            {
                res.status(500).json({message: 'utente non trovato'});
            }
            else
            {
                res.status(200).json(customer);
            }
        });
        
    } catch (err) 
    {
        console.log(err);
        res.status(500).json({message: 'errore catch'});
    }
});

router.put('/customer/:id', async(req, res) =>  //Aggiorna i dati di un utente con il JSON passato nel body della richiesta
{
    stripe.customers.update(req.params.id, req.body, (err, customer) =>
    {
        if(err)
        {
            console.log(err);
            res.status(500).json({message: "Errore nell'inserimento dei dati."});
        }
        else
        {
            res.status(200).json(customer);
        }
    })
});

router.delete('/customer/:id', async (req, res) =>
{
    stripe.customers.del(req.params.id, (err, confirmation) =>
     {
        if(err)
        {
            console.log(err);
            res.status(500).json({message: 'Errore nella richiesta'});
        }
        else
        {
            res.status(200).json(confirmation);
        }
    });
});

router.post('/customer', async (req, res) =>  //Crea un nuovo utente con il JSON nel body della richiesta
{

    try 
    {
        stripe.customers.create(req.body, async (err, customer) =>
            {
                if(err)
                {
                    console.log(err);
                    res.status(500).json({message: 'errore nella richiesta'});
                }
                else
                {               
                    const customerId = "" +customer.id; 
                    const user = await User.findOneAndUpdate({email : customer.email}, {$set: {stripeCustomerId: {customerId}}}, (err, user) =>
                    {
                        if(err)
                        {
                            console.log(err);
                            res.status(500).json({message: 'Utente non presente nel database'});
                        }
                        else
                        {
                            res.status(200).json({message: 'nuovo utente creato con successo'});
                            
                        }
                    });
                }
            }
        )
    } catch (err) {
        console.log(err);
    }
    
});

router.post('/charge', (req,res) =>  //Roba di test non toccare dio merda
{
    
    stripe.charges.create(
        {
            amount: req.body.amount,
            currency: req.body.currency,//Roba di test non toccare dio merda
            customer: req.body.customer,
        },
        (err, charge) =>
        {
            if(err)
            {
                console.log(err);
                res.status(500).json({message: 'Pagamento fallito'});//Roba di test non toccare dio merda
            }
            else
            {
                res.status(200).json({message: 'Pagamento effettuato'});//Roba di test non toccare dio merda
            }
        }//Roba di test non toccare dio merda
    );
});//Roba di test non toccare dio merda

router.post('/subscription', (req, res) =>
{
   
    stripe.subscriptions.create(req.body, (err, subscription) => //Crea un nuovo abbonamento con il JSON nel body della richiesta
        {
            if(err)
            {
                console.log(err);
                res.status(500).json({message: 'CreazioneS abbonamento fallita'});
            }
            else
            {
                console.log(subscription);
                res.status(500).json({message: `Abbonamento ${subscription.id} creato con successo`});
            }
        }
    )
});

router.get('/subscription/:id', async (req, res) =>
{
    stripe.subscriptions.retrieve(req.params.id , (err, subscription) => {
          if(err)
          {
              console.log(err);
              res.status(500).json({message: 'errore nella richiesta'});
          }
          else
          {
              res.status(200).json(subscription);
          }
        }
      );
});

router.put('/subscription/:id', async (req, res) =>
{
    stripe.subscriptions.update(req.params.id, req.body, (err, subscription) =>
     {
         if(err)
         {
             console.log(err);
             res.status(500).json({message: 'Errore nella richiesta'});
         }
         else
         {
             res.status(200).json(subscription);
         }
    })
});

router.delete('/subscription/:id', async(req, res) =>
{
    stripe.subscriptions.del(req.params.id, (err, confirmation) =>
    {
        if(err)
        {
            console.log(err);
            res.status(500).json({message: 'Errore nella richiesta'});
        }
        else
        {
            res.status(200).json(confirmation);
        }
    }
      );
})





module.exports = router;