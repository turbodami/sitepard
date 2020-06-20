import React, { Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import image from "../../images/image.gif";

import { useSpring, animated } from "react-spring";

const About = ({ isAuthenticated }) => {
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
                  Contattaci quando vuoi per qualsiasi motivo
                </p>
                <p className="subtitle is-3">
                  Proponici le feature che più ti piacerebbero, saremo lieti di
                  accondiscendere alle tue intelligenti richieste. In cambio
                  abuseremo di tua moglie.
                </p>
                <div className="buttons">
                  <Link to="/" className="button is-primary">
                    Scrivici su Whatsapp
                  </Link>
                  <Link to="/" className="button is-info">
                    Mandaci una mail
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

About.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(About);
