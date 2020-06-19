import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Nav = ({ prevStep }) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary" onClick={prevStep}>
                <strong>Step precedente</strong>
              </a>
            </div>
          </div>
        </div>

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
  );
};

export default Nav;
