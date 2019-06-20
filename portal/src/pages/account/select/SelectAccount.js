import React, { Component } from "react";
import AppNonAccountBody from "../../../components/app/AppNonAccountBody";
import { connect } from "react-redux";
import { getValidDomains } from "../../../store/accounts/UserAccountsSelectors";
import { selectAccount } from "../../../store/accounts/UserAccountsActions";
import { Redirect } from "react-router-dom";

class SelectAccountPage extends Component {
  render() {
    const { getValidDomains, consignors, resellers } = this.props;
    if (getValidDomains.length === 1) {
      let account;

      if (consignors.length > 0) {
        account = { ...consignors[0], type: "CONSIGNOR" };
      } else {
        account = { ...resellers[0], type: "RESELLER" };
      }

      this.props.selectAccount(account);
      const url = `/${account.domain}`;
      return <Redirect to={url} />;
    }

    return (
      <AppNonAccountBody header="Select Account">
        Select Account
      </AppNonAccountBody>
    );
  }
}

const mapStateToProps = state => ({
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
)(SelectAccountPage);
