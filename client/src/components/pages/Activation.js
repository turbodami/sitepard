import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types"; 

import { useSpring, animated } from "react-spring";

const About = ({ isAuthenticated }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <animated.div style={props}>
      <Fragment>
        <section className="section is-medium">
          <div className="container">
            <div className="columns">
              <div className="column is-2" />
              <div className="column is-8">
                <p className="title is-1">
                  Il tuo account è stato attivato!
                </p>
                <p className="subtitle is-3">
                  Accedi alla tua area personale per...
                </p>
                <div className="buttons">
                  <Link to="/login" className="button is-primary">
                    Accedi
                  </Link>
                </div>
              </div>
              <div className="column is-2" />
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
