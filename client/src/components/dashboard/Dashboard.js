import React, { Fragment, useEffect } from "react";

import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

import Nav from "./Nav";
import Spinner from "../layout/Spinner";
import PrivateRoute from "../routing/PrivateRoute";
import EditInfo from "./EditInfo";
import EditStyle from "./EditStyle";
import EditProducts from "./EditProducts";
import EditAccount from "./EditAccount";
import Main from "./Main";

import { getCurrentSite, deleteAccount } from "../../actions/site";

const Dashboard = ({
  getCurrentSite,
  auth: { user },
  site: { site, loading },
  logout,
}) => {
  useEffect(() => {
    getCurrentSite();
  }, [getCurrentSite]);

  return loading && site === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Nav />
      <div className="section">
        <div className="columns">
          <aside className="column is-2 aside">
            <nav className="menu">
              <p class="menu-label">Area personale</p>
              <ul className="menu-list" title="Impostazioni">
                <li>
                  <a href="">
                    <Link to="/dashboard">Il mio sito</Link>
                  </a>
                </li>
                <li>
                  <a href="">
                    <Link to="/editinfo">Modifica informazioni</Link>
                  </a>
                </li>
                <li>
                  <a href="">
                    <Link to="/editstyle">Modifica stile</Link>
                  </a>
                </li>
                <li>
                  <a href="">
                    <Link to="/editproducts">Modifica prodotti</Link>
                  </a>
                </li>
                <li>
                  <a href="">
                    <Link to="/editaccount">Modifica account</Link>
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          <main className="column is-10 main">
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Main} />
              <PrivateRoute exact path="/editinfo" component={EditInfo} />
              <PrivateRoute exact path="/editstyle" component={EditStyle} />
              <PrivateRoute
                exact
                path="/editproducts"
                component={EditProducts}
              />
              <PrivateRoute exact path="/editaccount" component={EditAccount} />
            </Switch>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentSite: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  site: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  site: state.site,
});

export default connect(mapStateToProps, {
  getCurrentSite,
  deleteAccount,
  logout,
})(Dashboard);
