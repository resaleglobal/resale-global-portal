import { Component } from "react";
import React from "react";
import Section from "../../../../components/section/Section";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

import "./Create.scss"
import ConsignorSelectDropdown from "./ConsignorSelectDropdown";

class GeneralSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      consignorId: ''
    };
  }

  handleChange = key => event => {
    this.setState({
      [key]: event.target.value,
    });

    this.props.generalCallback(this.state)
  };

  selectedConsignorIdCallback = consignorId => {
    this.setState({
      consignorId: consignorId
    })

    this.props.generalCallback(this.state)
  }


  render() {

    const {title, description} = this.state
    const {loading, titleError, descriptionError} = this.props

    return (
      <Section title="General">
        <FormControl
          required={true}
          variant="outlined"
          fullWidth={true}
          error={titleError}
        >
          <InputLabel htmlFor="title">Title</InputLabel>
          <OutlinedInput
            id="title"
            labelWidth={50}
            autoFocus={true}
            type="title"
            value={title}
            disabled={loading}
            onChange={this.handleChange("title")}
          ></OutlinedInput>
        </FormControl>
        <ConsignorSelectDropdown selectedConsignorIdCallback={this.selectedConsignorIdCallback}></ConsignorSelectDropdown>
        <FormControl
          required={true}
          variant="outlined"
          fullWidth={true}
          error={descriptionError}
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

      </Section>
    );
  }
}

export default GeneralSection;
