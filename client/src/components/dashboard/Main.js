import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "../devices.min.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import { Columns, Content } from "react-bulma-components";

import { getCurrentSite } from "../../actions/site";

const Main = ({ getCurrentSite, auth: { user }, site: { site, loading } }) => {
  useEffect(() => {
    getCurrentSite();
  }, [getCurrentSite]);

  return loading && site === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Columns>
        <Columns.Column size={8}>
          <Content>
            <p className="title is-2">
              Questa è l'area personale di {site && site.name}!
            </p>
            <p className="subtitle is-4">
              Puoi vedere il tuo sito nell'anteprima qui a destra. Per
              aggiungere prodotti o modificare il tuo sito clicca sulla voce
              corrispondente nel menu qui a sinistra.
            </p>

            <p>Il link del tuo sito è: </p>
            <Link to="www.pornhub.com">
              <h2 className="is-3">www.pizzavomito.it</h2>
            </Link>
            <br />
            <p>
              Copialo e incollalo dove vuoi, oppure condividi su Facebook e
              Instagram cliccando sui pulsanti qui sotto!
            </p>
            <button className="button is-primary is-rounded">Facebook</button>
            <button className="button is-danger is-rounded">Instagram</button>
            <br />
            <br />
            <br />
            <br />
          </Content>
        </Columns.Column>
        <Columns.Column size={4}>
          <Content>
            <div className="marvel-device iphone-x">
              <div className="notch">
                <div className="camera"></div>
                <div className="speaker"></div>
              </div>
              <div className="top-bar"></div>
              <div className="sleep"></div>
              <div className="bottom-bar"></div>
              <div className="volume"></div>
              <div className="overflow">
                <div className="shadow shadow--tr"></div>
                <div className="shadow shadow--tl"></div>
                <div className="shadow shadow--br"></div>
                <div className="shadow shadow--bl"></div>
              </div>
              <div className="inner-shadow"></div>
              <div className="screen">
                <h1>mmm</h1>
              </div>
            </div>
          </Content>
        </Columns.Column>
      </Columns>
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
