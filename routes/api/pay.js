const express = require('express');
const router = express.Router();
require('dotenv').config();
const cors = require("cors");
const User = require("../../models/User");

const stripe= require("stripe")("sk_test_k9rvKdpU76znJghy6Hjnrrgy00LxZnKWYy");
const { v4: uuid_v4 } = require('uuid')

//middleware
router.use(express.json());
router.use(cors());

//routes
router.get('/', (req, res) => {
    res.send("It works");
});

router.post('/payment', async (req, res) => {
    const { product, token } = req.body;
    console.log("PRODUCT ", product);
    console.log("PRICE ", product.price);
    const idempontencyKey = uuid_v4();
    
    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'eur',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`
        }, {idempontencyKey});
    })
    .then(async function() {
        console.log("sono dentro");
        const user = await User.findOneAndUpdate({email : req.body.email}, {$set: {temporaryPayment: true}}, (err, user) => {
            if(err) {
                console.log(err);
                
            } else {
                console.log("ce la faccio");
                
            }
        });
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
})

module.exports = router;