import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

import {
  isNewAccount,
  isAccountSelected,
  getValidDomains
} from "../../store/accounts/UserAccountsSelectors";
import { selectAccount } from "../../store/accounts/UserAccountsActions";

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
              selectAccount={this.props.selectAccount}
              accounts={[
                ...this.props.consignors.map(c => [
                  { ...c, type: "CONSIGNOR" }
                ]),
                ...this.props.resellers.map(r => [{ ...r, type: "RESELLER" }])
              ].flat()}
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
      const account = this.props.accounts.filter(a => {
        return a.domain === this.props.match.params.domain;
      })[0];

      this.props.selectAccount(account);
      return null;
    }

    // If domain in url is invalid redirect.
    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  isAccountSelected: isAccountSelected(state),
  isNewAccount: isNewAccount(state),
  getValidDomains: getValidDomains(state),
  consignors: state.userAccount.consignors,
  resellers: state.userAccount.resellers
});

const mapDispatchToProps = dispatch => {
  return {
    selectAccount: params => dispatch(selectAccount(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSelectDomain);
