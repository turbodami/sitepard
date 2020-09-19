import React, { Fragment, useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentSite } from "../../actions/site";

const Stripe = ({ getCurrentSite, site: { site }, auth: { user }}) => {

    const { email } = user; 

    useEffect(() => {
        getCurrentSite();
      }, [getCurrentSite]);

    const [product, setProduct] = useState({
        name: "prova",
        price: 20,
        productBy: "sitepard"
    });
    
    const makePayment = token => {

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
                window.location.reload();
            })
            .catch(error => console.log(error));
    }

    return (
        <Fragment>
            <div className="box has-background-primary">
                <p className="subtitle is-4">Paga entro 48 ore per attivare il servizio. Sono 20,00€ per 30 giorni.</p>
                <p className="subtitle is-5">Tranquillo! Non ci sarà alcun rinnovo automatico, ti contatteremo personalmente tra 30 giorni per capire insieme se il servizio è stato di tuo gradimento.</p>
                <StripeCheckout 
                    stripeKey="pk_live_kPkXGLa58tJoubhum0xXoGod00ICNvqE5w"
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

Stripe.propTypes = {
    getCurrentSite: PropTypes.func.isRequired,
    site: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};
  
const mapStateToProps = (state) => ({
    site: state.site,
    auth: state.auth
});

export default connect(mapStateToProps, {
    getCurrentSite,
})(Stripe);