import React, { Component } from "react";
import AppNonAccountBody from "../../../components/app/AppNonAccountBody";
import { connect } from "react-redux";
import { getValidDomains } from "../../../store/accounts/UserAccountsSelectors";
import { selectAccount } from "../../../store/accounts/UserAccountsActions";
import { Redirect } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { isAccountSelected } from "../../../store/accounts/UserAccountsSelectors";

class SelectAccountPage extends Component {
  selectAccount = params => {
    this.props.selectAccount(params);
  };

  render() {
    const {
      getValidDomains,
      consignors,
      resellers,
      domain,
      isAccountSelected
    } = this.props;

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

    if (isAccountSelected) {
      return <Redirect to={`/${domain}`} />;
    }

    return (
      <AppNonAccountBody header="Select Account">
        <Table>
          <TableHead className="table-head">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Domain</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resellers.map(row => (
              <TableRow
                className="account-select-row"
                key={row.id}
                onClick={() => this.selectAccount({ ...row, type: "RESELLER" })}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.domain}</TableCell>
                <TableCell>RESELLER</TableCell>
              </TableRow>
            ))}
            {consignors.map(row => (
              <TableRow
                className="account-select-row"
                key={row.id}
                onClick={() =>
                  this.selectAccount({ ...row, type: "CONSIGNOR" })
                }
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.domain}</TableCell>
                <TableCell>CONSIGNOR</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AppNonAccountBody>
    );
  }
}

const mapStateToProps = state => ({
  getValidDomains: getValidDomains(state),
  consignors: state.userAccount.consignors,
  resellers: state.userAccount.resellers,
  isAccountSelected: isAccountSelected(state),
  domain: state.userAccount.selected.domain
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
