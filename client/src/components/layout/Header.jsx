import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
  //changing header
  const authLinks = (
    <Fragment>
      <nav className="navbarLogged bg-white">
        <div className="nav-end">
          <ul>
            <li>
              <div className="buttons">
                <Link onClick={logout} to="/" className="btn btn-primary">
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <nav className="navbar bg-white">
        <div className="nav-start">
          <h1>
            <Link to="/">
              <i className="fas fa-code" /> Deploi
            </Link>
          </h1>

          <ul>
            <li>
              <Link to="/sitebuilder">Crea sito</Link>
            </li>
            <li>
              <Link to="/about">Chi siamo</Link>
            </li>
            <li>
              <Link to="/contact">Contattaci</Link>
            </li>
          </ul>
        </div>

        <div className="nav-end">
          <ul>
            <li>
              <div className="buttons">
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/sitebuilder" className="btn btn-danger">
                  Prova gratis
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );

  //redirect if logged in
  //if (isAuthenticated) {
  //return <Redirect to="/dashboard" />;
  //}

  return (
    <Fragment>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Fragment>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
