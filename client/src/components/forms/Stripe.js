import React, { Fragment, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Stripe = ({email}) => {
    const [product, setProduct] = useState({
        name: "prova",
        price: 20,
        productBy: "sitepard"
    });

    const makePayment = (token, email) => {
        
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        const data = {
            email,
            token,
            product
        }
        const body = JSON.stringify(data);

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
            <div className="box has-background-primary">
                <p className="subtitle is-4">Paga entro 48 ore per attivare il servizio. Sono 20,00€ per 30 giorni.</p>
                <p className="subtitle is-5">Tranquillo! Non ci sarà alcun rinnovo automatico, ti contatteremo personalmente tra 30 giorni per capire insieme se il servizio è stato di tuo gradimento.</p>
                <StripeCheckout 
                    stripeKey="pk_test_5kEss9zsrNnzTEmgT1DMA0Mx00StBPnE3c"
                    token={makePayment}
                    name="Paga ora"
                    amount={product.price * 100}
                    currency="EUR"
                    panelLabel="Paga "
                    locale="it"
                    allowRememberMe= {false}
                >
                    <button className="button is-info">Paga ora</button>
                </StripeCheckout>
            </div>
        </Fragment>
    );
}

export default Stripe;