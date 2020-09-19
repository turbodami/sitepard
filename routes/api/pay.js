const express = require('express');
const router = express.Router();
require('dotenv').config();
const cors = require("cors");
const User = require("../../models/User");

const stripe= require("stripe")("sk_live_Rwt6aABHpaiE6gR8wD8O5OUn00Dmiz6Hqc");
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
    const idempotencyKey = uuid_v4();
    
    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then(customer => {
        console.log(product.price);
        console.log(customer.id);
        console.log(token.email);
        console.log(product.name);
        console.log(idempotencyKey);
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'eur',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`
        }, {idempotencyKey});
    })
    .then(async function() {
        console.log("sono dentro");
        console.log(req.body.email);
        const user = await User.findOneAndUpdate({email : req.body.email}, {$set: {temporaryPayment: true}}, (err, user) => {
            if(err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
        console.log(user);
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
})

module.exports = router;