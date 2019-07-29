import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import { submitInviteUser } from "../../../store/admin/users/AdminUsersActions";
import CircularProgress from "@material-ui/core/CircularProgress";


import "./Users.scss"

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox"
import FormLabel from "@material-ui/core/FormLabel"

class InviteUserRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      adminPermission: false,
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      numberError: false,
      adminPermissionError: false,
    };
  }

  handleSubmit = () => {
    this.setState({
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      numberError: false,
      adminPermissionError: false,
    });

    let pass = true;

    if (!this.state.email || !/.+@.+\.[A-Za-z]+$/.test(this.state.email)) {
      this.setState({
        emailError: true
      });

      pass = false;
    }

    if (pass) {
      this.props.submitInviteUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        number: this.state.number,
        adminPermission: this.state.adminPermission,
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

  handleCheckboxChange = () => {
    this.setState({
      adminPermission: !this.state.adminPermission,
      adminPermissionError: false
    });
  };

  render() {

    const { loading } = this.props;

    return (
      <TableRow key="add-row">
        <TableCell align="center" className="table-profile">
          <img
            src="https://i.stack.imgur.com/34AD2.jpg"
            alt="profile"
          ></img>
        </TableCell>
        <TableCell>
          <FormControl
            fullWidth={true}
            variant="outlined"
            error={this.state.firstNameError}
          >
            <InputLabel htmlFor="firstname">First Name</InputLabel>
            <OutlinedInput
              id="firstname"
              labelWidth={100}
              autoFocus={true}
              type="text"
              value={this.state.firstNname}
              onChange={this.handleChange("firstName")}
              disabled={loading}
            ></OutlinedInput>
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl
            fullWidth={true}
            variant="outlined"
            error={this.state.lastNameError}
          >
            <InputLabel htmlFor="lastname">Last Name</InputLabel>
            <OutlinedInput
              id="lastname"
              labelWidth={100}
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange("lastName")}
              disabled={loading}
            ></OutlinedInput>
          </FormControl>
        </TableCell>
        <TableCell>
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
              type="email"
              value={this.state.email}
              onChange={this.handleChange("email")}
              disabled={loading}
            ></OutlinedInput>
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl
            fullWidth={true}
            variant="outlined"
            error={this.state.numberError}
          >
            <InputLabel htmlFor="number">Number</InputLabel>
            <OutlinedInput
              id="number"
              labelWidth={80}
              type="text"
              value={this.state.number}
              onChange={this.handleChange("number")}
              disabled={loading}
            ></OutlinedInput>
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl
            required={true}
            variant="outlined"
            error={this.state.adminPermissionError}
          >
            <FormLabel htmlFor="adminpermission">Admin</FormLabel>
            <Checkbox
              id="adminpermission"
              color="primary"
              checked={this.state.adminPermission}
              onChange={this.handleCheckboxChange}
              disabled={loading}
            ></Checkbox>
          </FormControl>
        </TableCell>
        <TableCell>
          <Button
            color="primary"
            variant="outlined"
            onClick={this.handleSubmit}
            disabled={loading}
            >
              {loading ? (
                <CircularProgress className="login-loader" />
              ) : (
                "Submit"
              )}</Button>
        </TableCell>
      </TableRow>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitInviteUser: params => dispatch(submitInviteUser(params)),
  };
};

const mapStateToProps = state => ({
  loading: state.adminUsers.invite.loading,
  hasError: state.adminUsers.invite.error,
  error: state.adminUsers.invite.errorMessage,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteUserRow);
