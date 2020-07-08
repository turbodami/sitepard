import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSpring, animated } from "react-spring";

//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, passwordForgot } from "../../actions/auth";

const PasswordForgot = ({ isAuthenticated, history, passwordForgot }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  let email;
  const onChange = (e) => email = e.target.value;

  const onSubmit = (e) => {
    e.preventDefault();
    passwordForgot(email, history);

  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <animated.div style={props}>
      <Fragment>
        <section className="section">
          <div className="container">
            
            <div className="columns">
              <div className="column is-3"></div>
              <div className="column is-6">
                <p className="title is-1">Recupera password</p>
                <p className="subtitle is-3">
                  Inserisci la tua email, poi controlla la tua casella di posta. Ti manderemo una email con la procedura per recuperare la password.
                </p>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="field">
                    <label className="label">Email</label>
                    <input
                      className="input"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="field">
                    <input
                      type="submit"
                      className="button is-primary"
                      value="Recupera password"
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

PasswordForgot.propTypes = {
  passwordForgot: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { passwordForgot })(PasswordForgot);
