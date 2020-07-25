import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { useSpring, animated } from "react-spring";
import image from "../../images/4.gif";
import image2 from "../../images/2.gif";
import image3 from "../../images/1.gif";

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
        <section className="section is-small">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-1" />
              <div className="column is-5">
                <p className="title is-1">
                  Crea il sito perfetto per la tua pizzeria in 5 minuti
                </p>
                <p className="subtitle is-3">
                  Carica il tuo menù e ricevi gli ordini su Whatsapp!
                </p>
                <div className="buttons">
                  <Link to="/sitebuilder" className="button is-info">
                    Prova ora
                  </Link>
                  <a href="https://wa.me/393515350988" className="button is-primary">
                    Scrivici su Whatsapp
                  </a>
                </div>
              </div>
              <div className="column is-5">
                <img className="image" src={image} alt="" />
              </div>
              <div className="column is-1" />
            </div>
          </div>
        </section>
        <section className="hero is-medium is-bold is-primary">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column is-1" />
                
                <div className="column is-5">
                  <img className="image" src={image2} alt="" />
                </div>
                <div className="column is-5">
                  <p className="title is-2">
                    Sitepard è la soluzione più facile per creare il sito perfetto per la tua pizzeria.
                  </p>
                  <p className="subtitle is-3">
                    Non ti serve nessuna conoscenza specifica, ti basta rispondere alle domande che ti verranno poste e inserire i prodotti.
                  </p>
                  <div className="buttons">
                    <Link to="/sitebuilder" className="button is-info">
                      Provalo ora
                    </Link>
                  </div>
                </div>
                <div className="column is-1" />
              </div>
            </div>
          </div>
        </section>
        <section className="hero is-medium is-white is-bold">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column is-1" />
                <div className="column is-5">
                  <p className="title is-2">
                    Con Sitepard non avrai più bisogno di agenzia o persone esterne
                  </p>
                  <p className="subtitle is-3">
                    Puoi gestire in autonomia il tuo sito internet e gli ordini dei tuoi clienti direttamente sul tuo Whatsapp!
                  </p>
                  <div className="buttons">
                    <Link to="/sitebuilder" className="button is-info">
                      Provalo ora
                    </Link>
                  </div>
                </div>
                <div className="column is-5">
                  <img className="image" src={image3} alt="" />
                </div>
                
                <div className="column is-1" />
              </div>
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
