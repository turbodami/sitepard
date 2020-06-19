import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { useSpring, animated } from "react-spring";
import image from "../../images/image.gif";

const Home = ({ isAuthenticated }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
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
                  <Link to="/sitebuilder" className="button is-primary">
                    Prova ora
                  </Link>
                  <Link to="/" className="button is-info">
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
