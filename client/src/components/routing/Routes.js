import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../layout/Header";
import Home from "../pages/Home";
import Login from "../layout/Login";
import Alert from "../layout/Alert";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import EditSite from "../site-forms/EditSite";
import AddProduct from "../site-forms/AddProduct";

const Routes = (props) => {
  return (
    <Fragment>
      <Header />
      <section>
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/contact" component={Contact} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/edit-site" component={EditSite} />
          <PrivateRoute exact path="/add-product" component={AddProduct} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;
