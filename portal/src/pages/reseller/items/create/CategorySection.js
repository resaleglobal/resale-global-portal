import { Component } from "react";
import React from "react";
import Section from "../../../../components/section/Section";
import CategorySelectDropdown from "./CategorySelectDropdown";
import CategoryAttributesInputs from "./CategoryAttributesInputs";

class CategorySection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: null,
      fields: {}
    };
  }

  categoryDropdownCallback = categoryId => {
    this.setState(
      {
        categoryId: categoryId
      },
      () => {
        this.props.categoryCallback(this.state);
      }
    );
  };

  callbackFields = fields => {
    this.setState(
      {
        fields: fields
      },
      () => {
        this.props.categoryCallback(this.state);
      }
    );
  };

  render() {
    return (
      <Section title="Category">
        <CategorySelectDropdown
          categoryDropdownCallback={this.categoryDropdownCallback}
        ></CategorySelectDropdown>
        <CategoryAttributesInputs
          categoryId={this.state.categoryId}
          callbackFields={this.callbackFields}
        ></CategoryAttributesInputs>
      </Section>
    );
  }
}

export default CategorySection;
