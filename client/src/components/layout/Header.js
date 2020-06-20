import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
  //changing header
  const authLinks = (
    <Link onClick={logout} to="/" className="btn btn-primary">
      Logout
    </Link>
  );

  //redirect if logged in
  //if (isAuthenticated) {
  //return <Redirect to="/dashboard" />;
  //}

  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <nav
            className="navbar is-spaced is-primary"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                <img
                  src="https://bulma.io/images/bulma-logo.png"
                  width="112"
                  height="28"
                />
              </Link>
            </div>

            <div className="navbar-menu">
              <div className="navbar-start">
                <Link className="navbar-item" to="/sitebuilder">
                  Crea sito
                </Link>
                <Link className="navbar-item" to="/about">
                  Chi siamo
                </Link>
                <Link className="navbar-item" to="/contact">
                  Contattaci
                </Link>
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <Link to="/login" className="button is-primary">
                      Login
                    </Link>
                    <Link to="/sitebuilder" className="button">
                      Prova gratis
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </Fragment>
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
