import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import CreatableSelect from 'react-select/creatable'
import { fetchResellerDepartments, createResellerDepartments } from '../../../store/reseller/departments/RDepartmentsActions';
import { departmentsDropdownLoading } from "../../../store/reseller/departments/RDepartmentsSelectors";



class DepartmentDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      department: null,
      createdLabel: null
    };
  }

  componentDidMount() {
    this.props.fetchResellerDepartments();
  }

  handleChange = event => {
    this.setState({
      createdLabel: null,
      department: event
    })

    this.callbackSelected(event)

  }

  callbackSelected = selected => {

    let returnValue = null

    if (!selected) {
      returnValue = selected
    } else if (selected.value) {
      returnValue = selected.value.id
    }
    console.log('calls', returnValue)
    this.props.callBackSelectedDropdown(returnValue)
  }

  handleCreate = event => {
    this.props.createResellerDepartments({'departmentName': event, 'selected': true})

    this.setState({
      createdLabel: event
    })
  }

  render() {

    const {departments, loading} = this.props
    const {department, createdLabel} = this.state

    const options = departments.map( dep => ({'label': dep.name, 'value': dep}))

    let option = department
    let loadingState = loading

    if (createdLabel) {
      const filtered = options.filter(dep => dep.label === createdLabel)
      if (filtered.length === 1) {
        option = filtered[0]
        this.handleChange(option)
      } else {
        loadingState = true
      }
    }

    return (
      <CreatableSelect
        isClearable
        isDisabled={loadingState}
        isLoading={loadingState}
        onChange={this.handleChange}
        onCreateOption={this.handleCreate}
        options={options}
        value={option}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResellerDepartments: () => dispatch(fetchResellerDepartments()),
    createResellerDepartments: params => dispatch(createResellerDepartments(params)),
  };
};

const mapStateToProps = state => ({
  departments: state.rDepartments.all.departments,
  loading: departmentsDropdownLoading(state),
  hasError: state.rDepartments.create.hasError,
  error: state.rDepartments.create.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartmentDropdown);
