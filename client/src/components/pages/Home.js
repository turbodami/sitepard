import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import image from "../../images/image.gif";

const Home = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="white-overlay">
        <div className="landing-inner">
          <div className="landing-content landing-text">
            <h1 className="x-large">
              Crea la presenza online della tua impresa
            </h1>
            <p className="lead">
              Ricevi gli ordini via Whatsapp senza bisogno di gestionale, fatti
              importunare continuamente dai tuoi clienti di merda fino a
              raggiungere l'esaurimento nervoso e rasentare l'alcolismo cronico.
            </p>
            <div className="buttons">
              <Link to="/sitebuilder" className="btn btn-primary">
                Prova ora
              </Link>
            </div>
          </div>
          <div className="landing-content landing-image">
            <img src={image} />
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
