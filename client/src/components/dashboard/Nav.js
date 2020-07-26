import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Nav = ({ logout, auth: { user } }) => {
  return (
    <Fragment>
      <nav
        className="navbar is-spaced is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <h1 className="title is-1">Sitepard</h1>
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="buttons">
              <Link to="/" className="button is-primary" onClick={logout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

Nav.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
})(Nav);
