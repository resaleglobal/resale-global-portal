import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { fetchResellerSelectedCategories } from "../../../../store/reseller/categories/RCategoriesActions";

class CategorySelectDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: null
    };
  }

  componentDidMount() {
    this.props.fetchResellerSelectedCategories();
  }

  handleChange = event => {
    this.setState({
      category: event
    });

    let result = null;
    if (event) {
      result = event.value.id;
    }

    this.props.categoryDropdownCallback(result);
  };

  render() {
    const { categories, loading } = this.props;
    const { category } = this.state;

    const options = categories.map(dep => ({
      label: dep.displayName,
      value: dep
    }));

    return (
      <Select
        className="select"
        isClearable
        isDisabled={loading}
        isLoading={loading}
        onChange={this.handleChange}
        options={options}
        value={category}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResellerSelectedCategories: () =>
      dispatch(fetchResellerSelectedCategories())
  };
};

const mapStateToProps = state => ({
  categories: state.rCategories.selected.categories,
  loading: state.rCategories.selected.loading,
  hasError: state.rCategories.selected.hasError,
  error: state.rCategories.selected.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySelectDropdown);
