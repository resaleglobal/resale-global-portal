import { Component } from "react";
import React from "react";
import { Button } from "@material-ui/core";

import "./Create.scss"

class SubmitSection extends Component {
  render() {
    return (
      <Button color="primary" variant="outlined" onClick={this.props.create} className="submit-button">Create Item</Button>
    );
  }
}

export default SubmitSection;
