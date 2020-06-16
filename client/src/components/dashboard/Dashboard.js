import React, { Fragment, useEffect } from "react";

import { Section, Columns, Navbar, Menu } from "react-bulma-components";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

import Spinner from "../layout/Spinner";
import PrivateRoute from "../routing/PrivateRoute";
import EditSite from "./EditSite";
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
      <Section>
        <Columns>
          <Columns.Column size={2}>
            <Navbar>
              <Menu>
                <Menu.List title="Impostazioni">
                  <Menu.List.Item>
                    <Link to="/dashboard">Il mio sito</Link>
                  </Menu.List.Item>
                  <Menu.List.Item>
                    <Link to="/editsite">Modifica sito</Link>
                  </Menu.List.Item>
                  <Menu.List.Item>
                    <Link to="/editproducts">Modifica prodotti</Link>
                  </Menu.List.Item>
                  <Menu.List.Item>
                    <Link to="/editaccount">Modifica account</Link>
                  </Menu.List.Item>
                  <Menu.List.Item>
                    <Link to="/" onClick={logout}>
                      Logout
                    </Link>
                  </Menu.List.Item>
                </Menu.List>
              </Menu>
            </Navbar>
          </Columns.Column>

          <Columns.Column size={10}>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Main} />
              <PrivateRoute exact path="/editsite" component={EditSite} />
              <PrivateRoute
                exact
                path="/editproducts"
                component={EditProducts}
              />
              <PrivateRoute exact path="/editaccount" component={EditAccount} />
            </Switch>
          </Columns.Column>
        </Columns>
      </Section>
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
