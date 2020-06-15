const express = require('express');
const router = express.Router();
const userDbController = require("../../controllers/userDbController");

const stripe = require('stripe')('sk_test_k9rvKdpU76znJghy6Hjnrrgy00LxZnKWYy');
const bodyParser = require('body-parser');
const moment = require('moment');

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
                console.log(customer);
                res.status(200).json({message: 'utente trovato'});
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
            res.status(200).json({message: "Utente aggiornato con successo."});
        }
    })
});

router.post('/customer', async (req, res) =>  //Crea un nuovo utente con il JSON nel body della richiesta
{

    try 
    {
        stripe.customers.create(req.body, async (err, costumer) =>
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    const newCostumer = costumer;
                    
                    const result = await userDbController.SetStripeCustomerId(newCostumer);

                    if(result == 0)
                    {
                        console.log("Utente non trovato");
                        return res.status(500).json({message: 'Cliente non trovato nel db'});
                    }
                    else
                    {
                        console.log("ottimo");
                        return res.status(200).json({message: 'Cliente creato'});
                    }
                }
            }
        )
    } catch (err) {
        console.log('Dioboy' + err);
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
    let trial;
    if(req.body.trial)
    {
        trial = moment().add(+30, 'days').unix();
        console.log(trial);
    }
    else
    {
        trial = null;
    }
    
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
})





module.exports = router;