import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Routes from "./components/routing/Routes";

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
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
