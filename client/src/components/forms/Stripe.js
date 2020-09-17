import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const Stripe = () => {
    const [product, setProduct] = useState({
        name: "prova",
        price: 20,
        productBy: "sitepard"
    });

    return (
        <Fragment>
            <StripeCheckout 
                stripeKey=""
                token=""
                name="Paga ora"
            />
        </Fragment>
    );
}

export default Stripe;