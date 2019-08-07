import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import CreatableSelect from 'react-select/creatable'
import { fetchResellerDropdownSections, createResellerSections, clearResellerDropdownSections } from '../../../store/reseller/sections/RSectionsActions';
import { sectionsDropdownLoading } from "../../../store/reseller/sections/RSectionsSelectors";



class SectionDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section: null,
      createdLabel: null,
      departmentId: null,
    };
  }

  componentDidMount() {
    if (this.props.departmentId) {
      this.props.fetchResellerDropdownSections({departmentId: this.props.departmentId});
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.departmentId) {
      
      if (this.props.sections.length > 0) {
        this.props.clearResellerDropdownSections()
      }

      if (this.state.section) {
        this.setState({
          section: null
        })
      }
      
    } else if (prevProps.departmentId !== this.props.departmentId) {
      this.props.fetchResellerDropdownSections({departmentId: this.props.departmentId});
    }
  }

  handleChange = event => {
    this.setState({
      createdLabel: null,
      section: event
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

    this.props.callBackSelectedDropdown(returnValue)
  }

  handleCreate = event => {
    this.props.createResellerSections({
      'sectionName': event,
      'selected': true,
      'departmentId': this.props.departmentId
    })

    this.setState({
      createdLabel: event
    })
  }

  render() {

    const {sections, loading} = this.props
    const {section, createdLabel} = this.state

    const options = sections.map( sec => ({'label': sec.section, 'value': sec}))

    let option = section
    let loadingState = loading

    if (createdLabel) {
      const filtered = options.filter(dep => dep.label === createdLabel)
      
      if (!this.props.loading) {
        this.props.fetchResellerDropdownSections({departmentId: this.props.departmentId});
      }

      if (filtered.length === 1) {
        option = filtered[0]
        this.handleChange(option)
      } else {
        loadingState = true
      }
    }

    let disabled = loadingState || this.props.departmentId === null

    return (
      <CreatableSelect
        isClearable
        isDisabled={disabled}
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
    fetchResellerDropdownSections: params => dispatch(fetchResellerDropdownSections(params)),
    createResellerSections: params => dispatch(createResellerSections(params)),
    clearResellerDropdownSections: () => dispatch(clearResellerDropdownSections())
  };
};

const mapStateToProps = state => ({
  sections: state.rSections.dropdown.sections,
  loading: sectionsDropdownLoading(state),
  hasError: state.rSections.create.hasError,
  error: state.rSections.create.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionDropdown);
