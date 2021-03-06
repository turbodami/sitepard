import React, { Fragment } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setAlert } from "../../actions/alert";

import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";

import Nav from "./Nav";

const Registration = ({ formData, onChange, registration, prevStep }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <animated.div style={props}>
      <Fragment>
        <section className="section">
          <div className="container">
            <Nav prevStep={prevStep} />
            <div className="columns">
              <div className="column is-3"></div>
              <div className="column is-6">
                <p className="title is-1">Registrati</p>
                <p className="subtitle is-3">
                  Conferma la tua email, effettua il login e finisci il tuo sito
                </p>
                <form onSubmit={(e) => registration(e)}>
                  <div className="field">
                    <label className="label">Email</label>
                    <input
                      className="input"
                      type="email"
                      placeholder="Inserisci email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <input
                      className="input"
                      type="password"
                      placeholder="Inserisci password"
                      name="password"
                      value={formData.password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Conferma password</label>
                    <input
                      className="input"
                      type="password"
                      placeholder="Ripeti password"
                      name="password2"
                      value={formData.password2}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="field">
                    <input
                      type="submit"
                      className="button is-primary"
                      value="Registrati"
                    />
                  </div>
                </form>
              </div>
              <div className="column is-3"></div>
            </div>
          </div>
        </section>
      </Fragment>
    </animated.div>
  );
};

Registration.propTypes = {
  setAlert: PropTypes.func.isRequired,

  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(withRouter(Registration));
