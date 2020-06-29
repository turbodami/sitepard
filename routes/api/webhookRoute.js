const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.post('/', bodyParser.raw({type: 'application/json'}), (req, res) =>
{
    let event;

    try 
    {
        event = JSON.parse(req.body);
    } 
    catch (err) 
    {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch(event.type)
    {
        case 'payment_intent.succeeded':
            const payment_intent = event.data.object;
            break;
    }

    res.JSON({received: true});
});

module.exports = router;