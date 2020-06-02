import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const About = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="light-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Non contattarci, stiamo scopando</h1>
          <p className="lead">
            Se non stiamo scopando stiamo bevendo, se non stiamo bevendo stiamo
            vomitando
          </p>
        </div>
      </div>
    </section>
  );
};

About.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(About);
