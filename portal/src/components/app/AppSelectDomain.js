import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

import {
  isNewAccount,
  isAccountSelected
, getValidDomains } from "../../store/accounts/UserAccountsSelectors";


class AppSelectDomain extends Component {
  render() {
    if (this.props.isAccountSelected) {
      return <>{this.props.children}</>;
    }

    if (this.props.isNewAccount) {
      return <Redirect to="/create-account" />;
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

const mapStateToProps = state => ({
  isAccountSelected: isAccountSelected(state),
  isNewAccount: isNewAccount(state),
  getValidDomains: getValidDomains(state)
});

export default connect(
  mapStateToProps,
  null
)(AppSelectDomain);
