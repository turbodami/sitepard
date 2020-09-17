import React, { Fragment, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Axios from "axios";

const Stripe = () => {
    const [product, setProduct] = useState({
        name: "prova",
        price: 20,
        productBy: "sitepard"
    });

    const makePayment = token => {
        const body = {
            token,
            product
        };
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

        return axios.post('/api/pay/payment', body, config)
            .then(response => {
                console.log("RESPONSE ", response);
                const { status } = response;
                console.log("STATUS ", status);
            })
            .catch(error => console.log(error));
    }

    return (
        <Fragment>
            <StripeCheckout 
                stripeKey={process.env.REACT_APP_KEY}
                token={makePayment}
                name="Paga ora"
                amount={product.price * 100}
            />
        </Fragment>
    );
}

export default Stripe;