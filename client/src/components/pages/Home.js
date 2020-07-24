import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { useSpring, animated } from "react-spring";
import image from "../../images/4.gif";
import image2 from "../../images/2.gif";

const Home = ({ isAuthenticated }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <animated.div style={props}>
      <Fragment>
        <section className="section is-medium">
          <div className="container">
            <div className="columns">
              <div className="column is-1" />
              <div className="column is-5">
                <p className="title is-1">
                  Genera il sito perfetto per la tua azienda in 5 minuti
                </p>
                <p className="subtitle is-3">
                  Carica il tuo menù e ricevi gli ordini su Whatsapp!
                </p>
                <div className="buttons">
                  <Link to="/sitebuilder" className="button is-info">
                    Prova ora
                  </Link>
                  <Link to="/" className="button is-primary">
                    Scrivici su Whatsapp
                  </Link>
                </div>
              </div>
              <div className="column is-5">
                <img className="image" src={image} alt="" />
              </div>
              <div className="column is-1" />
            </div>
          </div>
        </section>
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-one-third">
                  <h1 className="title">
                    Sitepard è il modo più facile esistente per creare il sito perfetto per la tua pizzeria!
                  </h1>
                  <h2 className="subtitle">
                    Non ti serve nessuna conoscenza, rispondi soltanto alle domande che ti vengono poste e inserisci i tuoi prodotti.
                  </h2>
                </div>
                <div className="column is-one-third">
                  <img className="image" src={image2} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="hero is-medium is-white is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Primary bold title
              </h1>
              <h2 className="subtitle">
                Primary bold subtitle
              </h2>
            </div>
          </div>
        </section>
        <section className="hero is-medium is-danger is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Primary bold title
              </h1>
              <h2 className="subtitle">
                Primary bold subtitle
              </h2>
            </div>
          </div>
        </section>
      </Fragment>
    </animated.div>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
