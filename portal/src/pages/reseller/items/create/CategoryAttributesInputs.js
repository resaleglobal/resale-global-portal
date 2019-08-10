import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import { fetchResellerSelectedAttributes } from "../../../../store/reseller/categories/RCategoriesActions";
import Section from "../../../../components/section/Section";

import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

class CategoryAttributesInputs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {}
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.categoryId !== this.props.categoryId) {
      if (this.props.categoryId) {
        this.props.fetchResellerSelectedAttributes(this.props.categoryId);
      } else {
        this.handleChange(null, null);
      }
    }
  }

  handleChange = key => event => {
    let fields = {};
    if (key) {
      fields = { ...this.state.fields, [key]: event.target.value };
    }

    this.setState({
      fields: fields
    });

    this.props.callbackFields(fields);
  };

  render() {
    let { loading, hasError, error, attributes } = this.props;

    let message = null;
    if (attributes.length === 0) {
      message = "There are no attributes for this category.";
    }

    if (this.props.categoryId === null) {
      message = "No category selected.";
      attributes = [];
    }

    return (
      <>
        {loading || hasError ? (
          <Section
            loading={loading}
            hasError={hasError}
            error={error}
          ></Section>
        ) : (
          <></>
        )}

        {message && !loading ? (
          <div className="attributes-message">{message}</div>
        ) : (
          <></>
        )}

        {attributes.map(attribute => {
          const width = attribute.attribute.length * 10;
          return (
            <FormControl
              variant="outlined"
              fullWidth={true}
              className="item-create"
              key={attribute.id.toString()}
            >
              <InputLabel
                className="capitalize"
                htmlFor={attribute.id.toString()}
              >
                {attribute.attribute}
              </InputLabel>
              <OutlinedInput
                id={attribute.id.toString()}
                labelWidth={width}
                autoFocus={true}
                type="title"
                onChange={this.handleChange(attribute.id)}
              ></OutlinedInput>
            </FormControl>
          );
        })}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResellerSelectedAttributes: categoryId =>
      dispatch(fetchResellerSelectedAttributes(categoryId))
  };
};

const mapStateToProps = state => ({
  attributes: state.rCategories.attributes.attributes,
  loading: state.rCategories.attributes.loading,
  hasError: state.rCategories.attributes.hasError,
  error: state.rCategories.attributes.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryAttributesInputs);
