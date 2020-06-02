const express = require('express');
const User = require("../models/User");

exports.SetStripeCustomerId = async (req)=>
{
    try {
        User.updateOne({email: req.email}, {$set: {stripeCustomerId: req.id }}, (err) =>
        {
            if(err)
            {
            console.log(err);
            return 0;
            }
            else
            {
            console.log("ottimo");
            }
        });
    } 
    catch (error) 
    {
        console.log(error);
    }
    
}