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
          <h1 className="x-large">Lavora con noi, facciamo cagare</h1>
          <p className="lead">
            Siamo un team eterogeneo composto da specialisti della bestemmia,
            bevitori cronici di borghetti e abusatori di negre
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
