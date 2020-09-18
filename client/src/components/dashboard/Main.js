import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import Mobile from "../show/Mobile";
import Stripe from "../forms/Stripe";

import { getCurrentSite } from "../../actions/site";

const Main = ({ getCurrentSite, auth: { user }, site: { site, loading } }) => {
  useEffect(() => {
    getCurrentSite();
  }, [getCurrentSite]);

  return loading && site === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="columns">
        <div className="column is-6">
          <nav className="breadcrumb is-small" aria-label="breadcrumbs">
            <ul>
              <li className="is-active">
                <a href="#">Dashboard</a>
              </li>
              <li className="is-active">
                <a href="#" aria-current="page">
                  Il mio sito
                </a>
              </li>
            </ul>
          </nav>
          <p className="title is-2">Il mio sito</p>
          <p className="subtitle is-4">
            Puoi vedere il tuo sito nell'anteprima qui a destra. 
            <br />
            Per prima cosa aggiungi il tuo menù cliccando su "Il mio menù" qui a sinistra!
          </p>

          <p>Il link del tuo sito è: </p>
          <a href={site.domain ? `http://${site.domain}` : `https://${site.subdomain}.sitepard.com`}> 
            <h2 className="subtitle is-4">{site.domain ? `https://${site.domain}` : `https://${site.subdomain}.sitepard.com`}</h2>
          </a>
          <br />
          <br />
          <p className="subtitle is-4">Paga entro 48 ore per attivare il servizio. Tranquillo! Non ci sarà alcun rinnovo automatico, ti contatteremo personalmente tra 30 giorni per capire insieme se il servizio è stato di tuo gradimento.</p>
          <Stripe />
          <br />
          <br />
          <br />
        </div>
        
        <div className="column is-6 has-text-centered">
          <Mobile />
        </div>
      </div>
    </Fragment>
  );
};

Main.propTypes = {
  getCurrentSite: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  site: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  site: state.site,
});

export default connect(mapStateToProps, {
  getCurrentSite,
})(Main);
