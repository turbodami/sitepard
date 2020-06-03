const express = require('express');
const router = express.Router();
const userDbController = require("../../controllers/userDbController");

const stripe = require('stripe')('sk_test_k9rvKdpU76znJghy6Hjnrrgy00LxZnKWYy');


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
                        return res.status(500).write('Utente non trovato');
                    }
                    else
                    {
                        console.log("ottimo");
                        return res.status(200);
                    }
                }
            }
        )
    } catch (err) {
        console.log('Dioboy' + err);
    }
    
});


module.exports = router;