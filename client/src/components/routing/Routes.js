import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Home from "../pages/Home";
import Login from "../layout/Login";

import About from "../pages/About";
import Contact from "../pages/Contact";

const Routes = (props) => {
  return (
    <Fragment>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/contact" component={Contact} />
      </Switch>

      <Footer />
    </Fragment>
  );
};

export default Routes;
