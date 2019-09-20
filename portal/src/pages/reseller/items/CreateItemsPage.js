import { Component } from "react";
import { connect } from "react-redux";
import React from "react";
import {
  createResellerItems,
  clearResellerItems
} from "../../../store/reseller/items/RItemsActions";
import GeneralSection from "./create/GeneralSection";
import CategorySection from "./create/CategorySection";
import ImagesSection from "./create/ImagesSection";
import SubmitSection from "./create/SubmitSection";
import { Redirect } from "react-router-dom";

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
      quantity: 0,
      createAnother: false
    };
  }

  create = () => {
    const attributes = [];
    for (const [key, value] of Object.entries(this.state.attributes)) {
      attributes.push({ attributeId: key, value: value });
    }

    const state = { ...this.state, attributes: JSON.stringify(attributes) };

    let formData = new FormData();

    for (var key in state) {
      if (key !== "files" || key !== "createAnother") {
        formData.append(key, state[key]);
      }
    }

    state.files.forEach(file => {
      formData.append("image", file, file.name);
    });

    this.props.createResellerItems(formData, state.createAnother);
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

  checkCreateAnother = checked => {
    this.setState({
      createAnother: checked
    });
  };

  render() {
    const { create, domain } = this.props;

    if (create.finished) {
      const params = create.createAnotherParams;
      console.log("test params", params);
      this.props.clearResellerItems();
      if (params) {
        return (
          <Redirect
            to={`/${domain}/reseller/items/create?consignorId=${params.get(
              "consignorId"
            )}`}
          />
        );
      }
      return <Redirect to={`/${domain}/reseller/items`} />;
    }

    return (
      <>
        <GeneralSection
          location={this.props.location}
          generalCallback={this.setGeneralState}
        ></GeneralSection>
        <CategorySection
          categoryCallback={this.setCategoryState}
        ></CategorySection>
        <ImagesSection imagesCallback={this.setImagesState}></ImagesSection>
        <SubmitSection
          create={this.create}
          location={this.props.location}
          checkCreateAnother={this.checkCreateAnother}
        ></SubmitSection>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createResellerItems: (params, createAnother) =>
      dispatch(createResellerItems(params, createAnother)),
    clearResellerItems: () => dispatch(clearResellerItems())
  };
};

const mapStateToProps = state => ({
  create: state.rItems.create,
  domain: state.userAccount.selected.domain
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateItemsPage);
