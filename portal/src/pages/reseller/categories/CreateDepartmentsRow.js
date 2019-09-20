import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import {
  createResellerDepartments,
  hideResellerDepartments
} from "../../../store/reseller/departments/RDepartmentsActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Users.scss";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

class CreateDepartmentsRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      department: "",
      selected: true,
      departmentError: false,
      selectedError: false
    };
  }

  handleSubmit = () => {
    this.setState({
      departmentError: false,
      selectedError: false
    });

    let pass = true;

    if (!this.state.department) {
      this.setState({
        departmentError: true
      });

      pass = false;
    }

    if (pass) {
      this.props.createResellerDepartments({
        departmentName: this.state.department,
        selected: this.state.selected
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

  handleSelectedChange = () => {
    this.setState({
      selected: !this.state.selected,
      selectedError: false
    });
  };

  callBackSelectedDropdown = selected => {
    this.setState({
      departmentId: selected
    });
  };

  handleCancel = () => {
    this.props.hideResellerDepartments();
  };

  render() {
    const { loading } = this.props;
    const { department, selected, departmentError, selectedError } = this.state;

    return (
      <TableRow key="add-row">
        <TableCell>
          <FormControl required={true} variant="outlined" error={selectedError}>
            <Checkbox
              id="selected"
              color="primary"
              checked={selected}
              onChange={this.handleSelectedChange}
              disabled={loading}
            ></Checkbox>
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl
            fullWidth={true}
            required={true}
            variant="outlined"
            error={departmentError}
          >
            <InputLabel htmlFor="department">Department</InputLabel>
            <OutlinedInput
              id="department"
              labelWidth={100}
              type="text"
              value={department}
              autoFocus={true}
              onChange={this.handleChange("department")}
              disabled={loading}
            ></OutlinedInput>
          </FormControl>
        </TableCell>
        <TableCell>
          <Button
            color="primary"
            variant="outlined"
            onClick={this.handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress className="login-loader" /> : "Submit"}
          </Button>
        </TableCell>
        <TableCell>
          <Button
            color="secondary"
            variant="outlined"
            onClick={this.handleCancel}
          >
            Cancel
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createResellerDepartments: params =>
      dispatch(createResellerDepartments(params)),
    hideResellerDepartments: () => dispatch(hideResellerDepartments())
  };
};

const mapStateToProps = state => ({
  loading: state.rDepartments.create.loading,
  hasError: state.rDepartments.create.hasError,
  error: state.rDepartments.create.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDepartmentsRow);
