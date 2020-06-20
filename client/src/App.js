import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";
import PrivateRoute from "./components/routing/PrivateRoute";

import Login from "./components/layout/Login";
import SiteBuilder from "./components/builder/SiteBuilder";
import Routes from "./components/routing/Routes";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";

//redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

//style;
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/sitebuilder" component={SiteBuilder} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/editinfo" component={Dashboard} />
          <PrivateRoute exact path="/editstyle" component={Dashboard} />
          <PrivateRoute exact path="/editaccount" component={Dashboard} />
          <PrivateRoute exact path="/editproducts" component={Dashboard} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
