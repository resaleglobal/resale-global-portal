import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import { createResellerSections } from "../../../store/reseller/sections/RSectionsActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Users.scss"
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox"
import DepartmentDropdown from "./DepartmentDropdown";

class CreateSectionsRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentId: "",
      selected: true,
      section: "",
      sectionError: false,
      departmentError: false,
      selectedError: false,
    };
  }

  handleSubmit = () => {
    this.setState({
      departmentError: false,
      selectedError: false,
    });

    console.log(this.state)

    let pass = true;

    if (!this.state.departmentId) {
      
      this.setState({
        departmentError: true
      });

      pass = false;
    }

    if (!this.state.section) {
      
      this.setState({
        sectionError: true
      });

      pass = false;
    }

    if (pass) {
      this.props.createResellerSections({
        departmentId: this.state.departmentId,
        sectionName: this.state.section,
        selected: this.state.selected,
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
    })
  }

  render() {

    const { loading } = this.props;
    const { department, selected, section, departmentError, selectedError, sectionError} = this.state

    return (
      <TableRow key="add-row">
        <TableCell align="center">
          <FormControl
            required={true}
            variant="outlined"
            error={selectedError}
          >
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
          <DepartmentDropdown callBackSelectedDropdown={this.callBackSelectedDropdown}></DepartmentDropdown>
        </TableCell>
        <TableCell>
          <FormControl
            fullWidth={true}
            required={true}
            variant="outlined"
            error={sectionError}
          >
            <InputLabel htmlFor="section">Section</InputLabel>
            <OutlinedInput
              id="section"
              labelWidth={100}
              type="text"
              value={section}
              autoFocus={true}
              onChange={this.handleChange("section")}
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
    createResellerSections: params => dispatch(createResellerSections(params)),
  };
};

const mapStateToProps = state => ({
  loading: state.rSections.create.loading,
  hasError: state.rSections.create.hasError,
  error: state.rSections.create.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSectionsRow);
