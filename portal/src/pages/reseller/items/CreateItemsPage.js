import { Component } from "react";
import { connect } from "react-redux";
import React from "react";
import { createResellerItems } from '../../../store/reseller/items/RItemsActions';
import GeneralSection from "./create/GeneralSection";
import CategorySection from "./create/CategorySection";
import ImagesSection from "./create/ImagesSection";
import SubmitSection from "./create/SubmitSection";

class CreateItemsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      consignorId: '1',
      price: '',
      files: []
    };
  }

  create = () => {
    this.props.createResellerItems(this.state)
  }

  setGeneralState = params => {
    this.setState({
      title: params.title,
      description: params.description
    })
  }

  setImagesState = files => {
    console.log(files)
    this.setState({
      files: files
    })
  }

  render() {
    return (
      <>
        <GeneralSection generalCallback={this.setGeneralState}></GeneralSection>
        <CategorySection></CategorySection>
        <ImagesSection imagesCallback={this.setImagesState}></ImagesSection>
        <SubmitSection create={this.create}></SubmitSection>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createResellerItems: params => dispatch(createResellerItems(params)),
  };
};

const mapStateToProps = state => ({
  items: state.rItems.items,
  loading: state.rItems.loading,
  hasError: state.rItems.hasError,
  error: state.rItems.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateItemsPage);
