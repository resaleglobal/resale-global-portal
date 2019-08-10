import { Component } from "react";
import { connect } from "react-redux";
import React from "react";
import { createResellerItems } from "../../../store/reseller/items/RItemsActions";
import GeneralSection from "./create/GeneralSection";
import CategorySection from "./create/CategorySection";
import ImagesSection from "./create/ImagesSection";
import SubmitSection from "./create/SubmitSection";

class CreateItemsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      consignorId: "",
      price: "",
      files: [],
      attributes: {},
      categoryId: "",
      price: 0,
      weight: 0,
      quantity: 0
    };
  }

  create = () => {
    const attributes = [];
    for (const [key, value] of Object.entries(this.state.attributes)) {
      attributes.push(JSON.stringify({ attributeId: key, value: value }));
    }
    this.props.createResellerItems({ ...this.state, attributes: attributes });
  };

  setGeneralState = params => {
    this.setState({
      title: params.title,
      description: params.description,
      consignorId: params.consignorId,
      price: params.price,
      weight: params.weight,
      quantity: params.quantity
    });
  };

  setImagesState = files => {
    this.setState({
      files: files
    });
  };

  setCategoryState = state => {
    this.setState({
      categoryId: state.categoryId,
      attributes: state.fields
    });
  };

  render() {
    return (
      <>
        <GeneralSection generalCallback={this.setGeneralState}></GeneralSection>
        <CategorySection
          categoryCallback={this.setCategoryState}
        ></CategorySection>
        <ImagesSection imagesCallback={this.setImagesState}></ImagesSection>
        <SubmitSection create={this.create}></SubmitSection>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createResellerItems: params => dispatch(createResellerItems(params))
  };
};

const mapStateToProps = state => ({
  items: state.rItems.items,
  loading: state.rItems.loading,
  hasError: state.rItems.hasError,
  error: state.rItems.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateItemsPage);
