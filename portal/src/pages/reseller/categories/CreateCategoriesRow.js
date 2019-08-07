import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import { createResellerCategories } from "../../../store/reseller/categories/RCategoriesActions";
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
import SectionDropdown from "./SectionDropdown";
import AttributesDropdown from "./AttributesDropdown"

class CreateCategoriesRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: [],
      category: "",
      sectionId: null,
      departmentId: null,
      selected: true,
      attributesError: false,
      categoryError: false,
      sectionIdError: false,
      departmentIdError: false,
      selectedError: false,
    };
  }

  handleSubmit = () => {
    this.setState({
      attributesError: false,
      categoryError: false,
      sectionIdError: false,
      departmentIdError: false,
      selectedError: false,
    });

    let pass = true;

    if (!this.state.category) {
      
      this.setState({
        categoryError: true
      });

      pass = false;
    }

    if (!this.state.sectionId) {
      
      this.setState({
        sectionIdError: true
      });

      pass = false;
    }

    if (!this.state.departmentId) {
      
      this.setState({
        departmentIdError: true
      });

      pass = false;
    }

    if (pass) {
      this.props.createResellerCategories({
        attributes: this.state.attributes,
        category: this.state.category,
        sectionId: this.state.sectionId,
        departmentId: this.state.departmentId,
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

  callBackDepartmentSelectedDropdown = selected => {
    this.setState({
      departmentId: selected
    })
  }

  callBackSectionSelectedDropdown = selected => {
    this.setState({
      sectionId: selected
    })
  }

  callBackAttributesSelectedDropdown = attributes => {
    console.log('attributes', attributes)
    this.setState({
      attributes
    })
  }

  render() {

    const { loading } = this.props;
    const { category, sectionId, departmentId, selected, categoryError, sectionError, departmentError, selectedError,} = this.state

    return (
      <TableRow key="add-row">
        <TableCell>
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
          <DepartmentDropdown callBackSelectedDropdown={this.callBackDepartmentSelectedDropdown}></DepartmentDropdown>
        </TableCell>
        <TableCell>
          <SectionDropdown callBackSelectedDropdown={this.callBackSectionSelectedDropdown} departmentId={departmentId}></SectionDropdown>
        </TableCell>
        <TableCell>
          <FormControl
            fullWidth={true}
            variant="outlined"
            error={categoryError}
            required={true}
          >
            <InputLabel htmlFor="category">Category</InputLabel>
            <OutlinedInput
              id="category"
              labelWidth={100}
              type="text"
              value={category}
              onChange={this.handleChange("category")}
              disabled={loading}
            ></OutlinedInput>
          </FormControl>
        </TableCell>
        <TableCell>
          <AttributesDropdown attributesCallback={this.callBackAttributesSelectedDropdown}></AttributesDropdown>
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
    createResellerCategories: params => dispatch(createResellerCategories(params)),
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
)(CreateCategoriesRow);
