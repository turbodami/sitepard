import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../layout/Login";
import Alert from "../layout/Alert";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SiteBuilder from "../builder/site_wiz/SiteBuilder";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import EditSite from "../site-forms/EditSite";
import AddProduct from "../site-forms/AddProduct";

const Routes = (props) => {
  return (
    <Fragment>
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/sitebuilder" component={SiteBuilder} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/edit-site" component={EditSite} />
          <PrivateRoute exact path="/add-product" component={AddProduct} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;
