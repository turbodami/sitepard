import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import Mobile from "../show/Mobile";

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
        <div className="column is-4">
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
          <p className="title is-2">Area personale</p>
          <p className="subtitle is-4">
            Puoi vedere il tuo sito nell'anteprima qui a destra. Per aggiungere
            prodotti o modificare il tuo sito clicca sulla voce corrispondente
            nel menu qui a sinistra.
          </p>

          <p>Il link del tuo sito è: </p>
          <a href={`http://${site.domain}.sitepard.com`}> 
            <h2 className="subtitle is-4">http://{site.domain}.sitepard.com</h2>
          </a>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div className="column is-4"></div>
        <div className="column is-4">
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
