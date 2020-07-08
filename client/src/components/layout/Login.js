import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSpring, animated } from "react-spring";

//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const defaultData = {
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(defaultData);
  const { email, password } = loginData;

  const onChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <animated.div style={props}>
      <Fragment>
        <section className="section">
          <div className="container">
            <nav
                className="navbar"
                role="navigation"
                aria-label="main navigation"
              >
              <div className="navbar-menu">
                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons">
                      <Link to="/">
                        <a className="delete is-large"></a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <div className="columns">
              <div className="column is-3"></div>
              <div className="column is-6">
                <p className="title is-1">Login</p>
                <p className="subtitle is-3">
                  Entra nella tua area personale
                </p>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="field">
                    <label className="label">Email</label>
                    <input
                      className="input"
                      type="email"
                      placeholder="Email per l'accesso"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="field">
                    <input
                      type="submit"
                      className="button is-primary"
                      value="Login"
                    />
                  </div>
                </form>
                <br />
                <br />
                <div className="is-small">
                  Se non hai ancora creato il tuo sito clicca <Link to="/sitebuilder">QUI</Link>.
                </div>
                <div className="is-small">
                  Hai dimenticato la tua password? Clicca <Link to="/passwordforgot">QUI</Link> per recuperarla.
                </div>
              </div>
              <div className="column is-3"></div>
            </div>
          </div>
        </section>
      </Fragment>
    </animated.div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
