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
  isAccountSelected
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

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.location.pathname !== "/login" ? (
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
    return (
      <>
        {this.props.isAppLoaded ? (
          <AppPageSection {...this.props} />
        ) : this.props.auth.token !== null ? (
          this.props.isAppLoading ? (
            <AppLoader />
          ) : (
            this.getUser()
          )
        ) : (
          <HandleLoginRedirect />
        )}
      </>
    );
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
    return (
      <Route path="/">
        <Navbar {...this.props} />
        <div className="body">
          {this.props.isAppError ? (
            <AppError {...this.props} />
          ) : this.props.isAccountSelected ? (
            <AppPageRoutes {...this.props} />
          ) : (
            <AppSelectDomain {...this.props} />
          )}
        </div>
      </Route>
    );
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
          error persists,{" "}
          <span onClick={this.submitLogout} className="link">
            click here to logout
          </span>{" "}
          and then log back in. If the issue persists, contact the administrator
          at admin@resaleglobal.com.
        </div>
      </div>
    );
  }
}

class AppSelectDomain extends Component {
  render() {
    return (
      <div>
        {this.props.isNewAccount ? (
          <AppNewAccount {...this.props} />
        ) : (
          <AppPageRoutes {...this.props} />
        )}
      </div>
    );
  }
}

class AppNewAccount extends Component {
  render() {
    return <div>Welcome, time to set up your new account!</div>;
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
  isAccountSelected: isAccountSelected(state)
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
