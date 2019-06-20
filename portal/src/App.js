import React, { Component } from "react";
import { connect } from "react-redux";

import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

import "./App.scss";
import Content from "./components/content/Content";
import { adminLinks } from "./pages/admin/Admin";
import { resellerLinks } from "./pages/reseller/Reseller";
import { consignorLinks } from "./pages/consignor/Consignor";
import { buyerLinks } from "./pages/buyer/Buyer";
import Login from "./pages/login/Login";

import {
  showAdmin,
  showBuyer,
  showConsignor,
  showReseller
} from "./store/accounts/UserAccountsSelectors";

import CreateAccountPage from "./pages/account/create/CreateAccount";
import SelectAccountPage from "./pages/account/select/SelectAccount";
import AppAuthenticated from "./components/app/AppAuthenticated";
import AppLoadData from "./components/app/AppLoadData";
import AppLoader from "./components/app/AppLoader";
import AppError from "./components/app/AppError";

import AppSelectDomain from "./components/app/AppSelectDomain";

export const protectedDomains = ["login", "create-account", "select-account"];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <AuthAppBody {...this.props} />
        </Switch>
      </div>
    );
  }
}

class AuthAppBody extends Component {
  render() {
    return (
      <AppLoader>
        <AppAuthenticated>
          <AppLoadData>
            <Navbar {...this.props} />
            <div className="body">
              <AppError>
                <Switch>
                  <Route
                    exact
                    path="/create-account"
                    component={CreateAccountPage}
                  />
                  <Route
                    exact
                    path="/select-account"
                    component={SelectAccountPage}
                  />
                  <Route path="/">
                    <AppSelectDomain {...this.props}>
                      <AppPageRoutes {...this.props} />
                    </AppSelectDomain>
                  </Route>
                </Switch>
              </AppError>
            </div>
          </AppLoadData>
        </AppAuthenticated>
      </AppLoader>
    );
  }
}

class AppPageRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/:domain/admin"
          render={routeProps =>
            this.props.showAdmin ? (
              <Content {...routeProps} links={adminLinks} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/:domain/reseller"
          render={routeProps =>
            this.props.showReseller ? (
              <Content {...routeProps} links={resellerLinks} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/:domain/consignor"
          render={routeProps =>
            this.props.showConsignor ? (
              <Content {...routeProps} links={consignorLinks} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/:domain/buyer"
          render={routeProps =>
            this.props.showBuyer ? (
              <Content {...routeProps} links={buyerLinks} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  showAdmin: showAdmin(state),
  showConsignor: showConsignor(state),
  showReseller: showReseller(state),
  showBuyer: showBuyer(state)
});

export default connect(
  mapStateToProps,
  null
)(App);
