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
import { fetchUser } from "./store/user/UserActions";

import CircularProgress from "@material-ui/core/CircularProgress";

import {
  isNewAccount,
  showAdmin,
  showBuyer,
  showConsignor,
  showReseller,
  isAccountSelected,
  getValidDomains
} from "./store/accounts/UserAccountsSelectors";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { submitLogout } from "./store/authorization/AuthActions";
import { createReseller } from "./store/accounts/UserAccountsActions";
import {
  isAppLoading,
  isAppLoaded,
  isAppError,
  isAppAuthenticated
} from "./store/AppSelectors";

import CreateAccountPage from "./pages/account/create/CreateAccount";
import SelectAccountPage from "./pages/account/select/SelectAccount";

const showNavbarRoutes = ["/login"];
const isShowNavbarRoute = route => showNavbarRoutes.includes(route);

class App extends Component {
  render() {
    return (
      <div className="App">
        {!isShowNavbarRoute(this.props.location.pathname) ? (
          <AuthAppBody {...this.props} />
        ) : (
          <></>
        )}
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

class AuthAppBody extends Component {
  getUser = () => {
    this.props.fetchUser();
  };

  render() {
    if (this.props.isAppLoading) {
      return <AppLoader />;
    }

    if (this.props.isAppLoaded) {
      return (
        <>
          <Navbar {...this.props} />
          <div className="body">
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
                <AppPageSection {...this.props} />
              </Route>
            </Switch>
          </div>
        </>
      );
    }

    if (this.props.isAppAuthenticated) {
      return <>{this.getUser()}</>;
    }

    return <HandleLoginRedirect />;
  }
}

class HandleLoginRedirect extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/:domain" component={LoginRedirectToDomain} />
      </Switch>
    );
  }
}

class LoginRedirectToDomain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: ""
    };
  }

  componentDidMount() {
    const { domain } = this.props.match.params;
    this.setState({
      domain
    });
  }

  render() {
    const url = `/login?domain=${this.state.domain}`;
    return this.state.domain ? <Redirect to={url} /> : null;
  }
}

class AppLoader extends Component {
  render() {
    return (
      <div className="app-loader">
        <CircularProgress className="loader" />
      </div>
    );
  }
}

class AppPageSection extends Component {
  render() {
    if (this.props.isAppError) {
      return <AppError {...this.props} />;
    }

    if (this.props.isAccountSelected) {
      return <AppPageRoutes {...this.props} />;
    }

    return <AppSelectDomain {...this.props} />;
  }
}

class AppError extends Component {
  submitLogout = () => {
    this.props.submitLogout();
  };

  render() {
    return (
      <div className="error-container">
        <ErrorOutlineIcon className="error-icon" />
        <div className="error-message">
          There was an error loading the app. Try refreshing the page. If the
          error persists,
          {" "}
          <span onClick={this.submitLogout} className="link">
            click here to logout
          </span>
          {" "}
          and then log back in. If the issue persists, contact the administrator
          at admin@resaleglobal.com.
        </div>
      </div>
    );
  }
}

class AppSelectDomain extends Component {
  render() {
    if (this.props.isNewAccount) {
      return <Redirect to="/create-account" />;
    }

    if (this.isAccountSelected) {
      return <AppPageRoutes {...this.props} />;
    }

    return (
      <Switch>
        <Route
          path="/:domain"
          render={routeProps => (
            <AutoSelectDomain
              {...routeProps}
              getValidDomains={this.props.getValidDomains}
            />
          )}
        />
        <Route path="/">
          <Redirect to="/select-account" />
        </Route>
      </Switch>
    );
  }
}

class AutoSelectDomain extends Component {
  isValidDomain = () => {
    return this.props.getValidDomains.includes(this.props.match.params.domain);
  };

  render() {
    if (this.isValidDomain()) {
      // TODO: SELECT DOMAIN in state.
    }

    // If domain in url is invalid redirect.
    return <Redirect to="/" />;
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
  auth: state.auth,
  isAppAuthenticated: isAppAuthenticated(state),
  isAppError: isAppError(state),
  isAppLoaded: isAppLoaded(state),
  isAppLoading: isAppLoading(state),
  isNewAccount: isNewAccount(state),
  showAdmin: showAdmin(state),
  showConsignor: showConsignor(state),
  showResller: showReseller(state),
  showBuyer: showBuyer(state),
  isAccountSelected: isAccountSelected(state),
  getValidDomains: getValidDomains(state)
});

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    submitLogout: () => dispatch(submitLogout()),
    createReseller: params => dispatch(createReseller(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
