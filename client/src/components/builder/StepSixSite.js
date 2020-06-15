import React, { Fragment } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const StepSixSite = ({ formData, onChange, nextStep, setAlert, register }) => {
  const { email, password, password2 } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email !== "" || password !== "") {
      if (password !== password2) {
        setAlert("Le password non corrispondono", "danger");
      } else {
        register({ email, password });
        nextStep();
      }
    } else {
      setAlert("Ci sono dei campi non validi", "danger");
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Registrati</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Conferma la tua email, effettua il login e finisci il tuo sito
      </p>
      <div className="flex-center">
        <form className="form left" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Inserisci email"
              name="email"
              value={formData.email}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Dovrai confermare che è la tua vera email
            </small>
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Inserisci password"
              name="password"
              value={formData.password}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Deve avere almeno 17 caratteri, di cui almeno 1 in sanscrito
              vedico, 1 runico e 1 bestemmia
            </small>
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Ripeti password"
              name="password2"
              value={formData.password2}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">Ripeti, non come Paganini</small>
          </div>
          <div className="center">
            <input
              type="submit"
              className="btn btn-primary"
              value="Registrati"
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

StepSixSite.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(
  withRouter(StepSixSite)
);
