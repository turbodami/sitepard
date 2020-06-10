const express = require('express');
const router = express.Router();
const userDbController = require("../../controllers/userDbController");

const stripe = require('stripe')('sk_test_k9rvKdpU76znJghy6Hjnrrgy00LxZnKWYy');
const bodyParser = require('body-parser');


router.post('/create-customer', async (req, res) =>
{

    try 
    {
        stripe.customers.create(
            {
                email: req.body.email
            }, async (err, costumer) =>
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

router.post('/charge', (req,res) => 
{
    
    stripe.charges.create(
        {
            amount: req.body.amount,
            currency: req.body.currency,
            customer: req.body.customer,
        },
        (err, charge) =>
        {
            if(err)
            {
                console.log(err);
                res.status(500).json({message: 'Pagamento fallito'});
            }
            else
            {
                res.status(200).json({message: 'Pagamento effettuato'});
            }
        }
    );
});

router.post('/subscription', (req, res) =>
{
    stripe.subscriptions.create(
        {
            customer: req.body.customer,
            items: [{price: req.body.price}]
        },
        (err, subscription) =>
        {
            if(err)
            {
                res.status(500).json({message: 'CreazioneS abbonamento fallita'});
            }
            else
            {
                res.status(500).json({message: `Abbonamento ${subscription.id} creato con successo`});
            }
        }
    )
})





module.exports = router;