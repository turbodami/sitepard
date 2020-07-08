import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../layout/Header";
import Home from "../pages/Home";
import Login from "../layout/Login";

import About from "../pages/About";
import Contact from "../pages/Contact";
import Activation from "../pages/Activation";
import PasswordReset from "../pages/PasswordReset";
import PasswordForgot from "../pages/PasswordForgot";

const Routes = (props) => {
  return (
    <Fragment>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/activation" component={Activation} />
        <Route exact path="/passwordreset" component={PasswordReset} />
        <Route exact path="/passwordforgot" component={PasswordForgot} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
