import React, { Component } from "react";
import { connect } from "react-redux";
import "./Login.scss";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { submitRegisterInvitedConsignor } from "../../store/authorization/AuthActions";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

import CircularProgress from "@material-ui/core/CircularProgress";

import { isAppAuthenticated } from "../../store/AppSelectors";

class InviteConsignorPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      verifyPassword: "",
      passwordError: false,
      verifyPasswordError: false,
    };
  }

  handleSubmit = (email, domain, token, consignor) => {
    this.setState({
      passwordError: false,
      emailError: false
    });

    let pass = true;

    if (!this.state.password) {
      this.setState({
        passwordError: true
      });

      pass = false;
    }

    if (!this.state.verifyPassword || this.state.verifyPassword !== this.state.password) {
      this.setState({
        verifyPasswordError: true
      });

      pass = false;
    }

    if (pass) {
      this.props.submitRegisterInvitedConsignor({
        email,
        password: this.state.password,
        domain,
        token,
        consignor
      });
    }
  };

  handleChange = key => event => {
    let errorKey = `${key}Error`;
    this.setState({
      [key]: event.target.value,
      [errorKey]: false
    });
  };

  render() {
    const { loading, isAppAuthenticated, hasError, error } = this.props;

    const values = queryString.parse(this.props.location.search);
    const domain = values.domain ? values.domain : "";
    const email = values.email ? values.email : "";
    const token = values.token ? values.token : "";
    const consignor = values.consignor ? values.consignor : "";
    const url = `/`;

    if (isAppAuthenticated) {
      return <Redirect to={url} />;
    }

    return (
      <div className="login">
        <div className="login-box">
          <div className="box-top">
            <img src="/rglogo.png" alt="logo" />
            <div className="title">RESALE GLOBAL</div>
          </div>

          <div className="box-body">
            <div className="box-body-title">{domain}.shopify.com</div>
            {hasError ? <div className="login-error">{error}</div> : null}
            <FormControl
              fullWidth={true}
              required={true}
              variant="outlined"
              error={this.state.emailError}
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                labelWidth={50}
                autoFocus={true}
                type="email"
                value={email}
                disabled={true}
              ></OutlinedInput>
            </FormControl>
            <FormControl
              fullWidth={true}
              required={true}
              variant="outlined"
              error={this.state.passwordError}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                labelWidth={80}
                type="password"
                value={this.state.password}
                onChange={this.handleChange("password")}
                disabled={loading}
              ></OutlinedInput>
            </FormControl>
            <FormControl
              fullWidth={true}
              required={true}
              variant="outlined"
              error={this.state.verifyPasswordError}
            >
              <InputLabel htmlFor="verifypassword">Verify Password</InputLabel>
              <OutlinedInput
                id="verifypassword"
                labelWidth={130}
                type="password"
                value={this.state.verifyPassword}
                onChange={this.handleChange("verifyPassword")}
                disabled={loading}
              ></OutlinedInput>
            </FormControl>
            <Button
              fullWidth={true}
              color="primary"
              variant="outlined"
              onClick={() => this.handleSubmit(email, domain, token, consignor)}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress className="login-loader" />
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitRegisterInvitedConsignor: param => dispatch(submitRegisterInvitedConsignor(param))
  };
};

const mapStateToProps = state => ({
  loading: state.auth.loginLoading,
  hasError: state.auth.loginError,
  error: state.auth.loginErrorMessage,
  isAppAuthenticated: isAppAuthenticated(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteConsignorPage);
