import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Home = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="light-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Crea la presenza online della tua impresa</h1>
          <p className="lead">
            Ricevi gli ordini via Whatsapp senza bisogno di gestionale
          </p>
          <div className="buttons">
            <Link to="/sitebuilder" className="btn btn-primary">
              Prova ora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
