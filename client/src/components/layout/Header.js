import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Header = () => {

  //redirect if logged in
  //if (isAuthenticated) {
  //return <Redirect to="/dashboard" />;
  //}

  return (
    <Fragment>
      
        <Fragment>
          <nav
            className="navbar is-spaced is-white"
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
                    <Link to="/login" className="button is-warning">
                      Login
                    </Link>
                    <Link to="/sitebuilder" className="button is-danger">
                      Prova gratis
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </Fragment>
      
    </Fragment>
  );
};

export default Header;
