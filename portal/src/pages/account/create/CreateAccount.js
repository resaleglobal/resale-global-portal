import React, { Component } from "react";
import AppNonAccountBody from "../../../components/app/AppNonAccountBody";
import "./CreateAccount.scss";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";

import {
  createReseller,
  createConsignor
} from "../../../store/accounts/UserAccountsActions";

import { isAccountSelected } from "../../../store/accounts/UserAccountsSelectors";
import { Redirect } from "react-router-dom";

class CreateAccountPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rName: "",
      rDomain: "",
      rNameError: false,
      rDomainError: false,
      cName: "",
      cDomain: "",
      cNameError: false,
      cDomainError: false
    };
  }

  handleChange = key => event => {
    let errorKey = `${key}Error`;
    this.setState({
      [key]: event.target.value,
      [errorKey]: false
    });
  };

  handleResellerSumbit = () => {
    this.setState({
      rNameError: false,
      rDomainError: false
    });

    let pass = true;

    if (!this.state.rName) {
      this.setState({
        rNameError: true
      });

      pass = false;
    }

    if (!this.state.rDomain || !/^\S*$/.test(this.state.rDomain)) {
      this.setState({
        rDomainError: true
      });

      pass = false;
    }

    if (pass) {
      this.props.createReseller({
        name: this.state.rName,
        domain: this.state.rDomain
      });
    }
  };

  handleConsignorSumbit = () => {
    this.setState({
      cNameError: false,
      cDomainError: false
    });

    let pass = true;

    if (!this.state.cName) {
      this.setState({
        cNameError: true
      });

      pass = false;
    }

    if (!this.state.cDomain || !/^\S*$/.test(this.state.cDomain)) {
      this.setState({
        cDomainError: true
      });

      pass = false;
    }

    if (pass) {
      this.props.createConsignor({
        name: this.state.cName,
        domain: this.state.cDomain
      });
    }
  };

  render() {
    const {
      rLoading,
      rHasError,
      rError,
      cLoading,
      cHasError,
      cError,
      isAccountSelected,
      domain
    } = this.props;

    if (isAccountSelected) {
      return <Redirect to={`/${domain}`} />;
    }

    return (
      <AppNonAccountBody header="Create Account">
        <div className="create-container">
          <div className="outlined item">
            <div className="item-title">Reseller</div>
            <div className="item-summary">
              Want to run your own store? Then create a reseller account to
              start selling items from potential consignors.
            </div>
            {rHasError ? <div className="error">{rError}</div> : null}
            <FormControl
              fullWidth={true}
              required={true}
              variant="outlined"
              error={this.state.rNameError}
            >
              <InputLabel htmlFor="rname">Name</InputLabel>
              <OutlinedInput
                id="rname"
                labelWidth={50}
                autoFocus={true}
                type="text"
                value={this.state.rName}
                onChange={this.handleChange("rName")}
                disabled={rLoading}
              ></OutlinedInput>
            </FormControl>
            <FormControl
              fullWidth={true}
              required={true}
              variant="outlined"
              error={this.state.rDomainError}
            >
              <InputLabel htmlFor="rDomain">Domain</InputLabel>
              <OutlinedInput
                id="rDomain"
                labelWidth={80}
                type="text"
                value={this.state.rDomain}
                onChange={this.handleChange("rDomain")}
                disabled={rLoading}
              ></OutlinedInput>
            </FormControl>
            <Button
              fullWidth={true}
              color="primary"
              variant="outlined"
              onClick={this.handleResellerSumbit}
              disabled={rLoading}
            >
              {rLoading ? (
                <CircularProgress className="login-loader" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
          <div className="middle item">OR</div>
          <div className="outlined item">
            <div className="item-title">Consignor</div>
            <div className="item-summary">
              Want to make some extra money without the overhead of running a
              store? Sign up to become a consignor.
            </div>
            {cHasError ? <div className="error">{cError}</div> : null}
            <FormControl
              fullWidth={true}
              required={true}
              variant="outlined"
              error={this.state.cNameError}
            >
              <InputLabel htmlFor="cname">Name</InputLabel>
              <OutlinedInput
                id="cname"
                labelWidth={50}
                autoFocus={true}
                type="text"
                value={this.state.cName}
                onChange={this.handleChange("cName")}
                disabled={cLoading}
              ></OutlinedInput>
            </FormControl>
            <FormControl
              fullWidth={true}
              required={true}
              variant="outlined"
              error={this.state.cDomainError}
            >
              <InputLabel htmlFor="cDomain">Domain</InputLabel>
              <OutlinedInput
                id="cDomain"
                labelWidth={80}
                type="text"
                value={this.state.cDomain}
                onChange={this.handleChange("cDomain")}
                disabled={cLoading}
              ></OutlinedInput>
            </FormControl>
            <Button
              fullWidth={true}
              color="primary"
              variant="outlined"
              onClick={this.handleConsignorSumbit}
              disabled={cLoading}
            >
              {cLoading ? (
                <CircularProgress className="login-loader" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </AppNonAccountBody>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createReseller: params => dispatch(createReseller(params)),
    createConsignor: params => dispatch(createConsignor(params))
  };
};

const mapStateToProps = state => ({
  cLoading: state.userAccount.createConsignor.loading,
  cHasError: state.userAccount.createConsignor.hasError,
  cError: state.userAccount.createConsignor.error,
  rLoading: state.userAccount.createReseller.loading,
  rHasError: state.userAccount.createReseller.hasError,
  rError: state.userAccount.createReseller.error,
  domain: state.userAccount.selected.domain,
  isAccountSelected: isAccountSelected(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccountPage);
