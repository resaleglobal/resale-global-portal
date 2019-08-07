import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import CreatableSelect from 'react-select/creatable'
import { attributesOptions } from "../../../store/reseller/attributes/RAttributesSelectors";
import { fetchResellerAttributes } from '../../../store/reseller/attributes/RAttributesActions';

class AttributesDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: []
    };
  }

  componentDidMount() {
    this.props.fetchAttributes();
  }

  createOption = (label) => ({
    label,
    value: label,
  });

  handleChange = attributes => {
    this.setState({
      attributes
    })

    this.handleCallback(attributes)
  }

  handleCreate = attribute => {
    const option = this.createOption(attribute)
    const attributes = [...this.state.attributes, option]
    this.setState({
      attributes: attributes
    })

    this.handleCallback(attributes)
  }

  handleCallback = (attributes) => {
    this.props.attributesCallback(attributes.map(a => a.label))
  }

  render() {

    const { options, loading } = this.props

    const isDisabled = loading
    const isLoading = loading
    const option = this.state.attributes


    return (
      <CreatableSelect
        isClearable
        isMulti
        isDisabled={isDisabled}
        isLoading={isLoading}
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
    fetchAttributes: () => dispatch(fetchResellerAttributes())
  };
};

const mapStateToProps = state => ({
  options: attributesOptions(state),
  loading: state.rAttributes.all.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttributesDropdown);