import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";

//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ openLogin, handleLoginClose, login, isAuthenticated }) => {
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
    <Fragment>
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user" /> Entra nella tua area personale
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Indirizzo email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Non hai ancora creato il tuo sito?{" "}
        <Link to="/register">Crealo ora</Link>
      </p>
    </Fragment>
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
