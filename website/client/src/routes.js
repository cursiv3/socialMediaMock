import React from "react";
import { Switch, Route } from "react-router-dom";

import LoginPage from "./views/loginPage";
import SignUpPage from "./views/signUpPage";
import HomePage from "./views/homePage";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route path="/sign_up" component={SignUpPage} />
  </Switch>
);

export default Routes;
