import { Component } from "react";
import React from "react";
import Section from "../../../../components/section/Section";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

import "./Create.scss";
import ConsignorSelectDropdown from "./ConsignorSelectDropdown";

class GeneralSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      consignorId: "",
      price: "",
      weight: "",
      quantity: ""
    };
  }

  handleChange = key => event => {
    this.setState(
      {
        [key]: event.target.value
      },
      () => {
        this.props.generalCallback(this.state);
      }
    );
  };

  selectedConsignorIdCallback = consignorId => {
    this.setState(
      {
        consignorId: consignorId
      },
      () => {
        this.props.generalCallback(this.state);
      }
    );
  };

  render() {
    const { title, description, price, weight, quantity } = this.state;
    const {
      loading,
      titleError,
      descriptionError,
      priceError,
      weightError,
      quantityError
    } = this.props;

    return (
      <Section title="General">
        <FormControl
          required={true}
          variant="outlined"
          fullWidth={true}
          autoFocus={true}
          error={titleError}
          className="item-create"
        >
          <InputLabel htmlFor="title">Title</InputLabel>
          <OutlinedInput
            id="title"
            labelWidth={50}
            type="title"
            value={title}
            disabled={loading}
            onChange={this.handleChange("title")}
          ></OutlinedInput>
        </FormControl>
        <ConsignorSelectDropdown
          selectedConsignorIdCallback={this.selectedConsignorIdCallback}
        ></ConsignorSelectDropdown>
        <FormControl
          required={true}
          variant="outlined"
          fullWidth={true}
          error={descriptionError}
          className="item-create"
        >
          <InputLabel htmlFor="description">Description</InputLabel>
          <OutlinedInput
            id="title"
            labelWidth={100}
            autoFocus={true}
            type="title"
            value={description}
            disabled={loading}
            multiline={true}
            onChange={this.handleChange("description")}
          ></OutlinedInput>
        </FormControl>
        <FormControl
          required={true}
          variant="outlined"
          fullWidth={true}
          error={priceError}
          className="item-create"
        >
          <InputLabel htmlFor="price">Price</InputLabel>
          <OutlinedInput
            id="price"
            labelWidth={50}
            type="number"
            value={price}
            disabled={loading}
            onChange={this.handleChange("price")}
          ></OutlinedInput>
        </FormControl>
        <FormControl
          required={true}
          variant="outlined"
          fullWidth={true}
          error={weightError}
          className="item-create"
        >
          <InputLabel htmlFor="weight">Weight</InputLabel>
          <OutlinedInput
            id="weight"
            labelWidth={50}
            type="number"
            value={weight}
            disabled={loading}
            onChange={this.handleChange("weight")}
          ></OutlinedInput>
        </FormControl>

        <FormControl
          required={true}
          variant="outlined"
          fullWidth={true}
          error={quantityError}
          className="item-create"
        >
          <InputLabel htmlFor="quantity">Quantity</InputLabel>
          <OutlinedInput
            id="quantity"
            labelWidth={50}
            type="number"
            value={quantity}
            disabled={loading}
            onChange={this.handleChange("quantity")}
          ></OutlinedInput>
        </FormControl>
      </Section>
    );
  }
}

export default GeneralSection;
