import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";

class CategoryCheckbox extends Component {
  handleSelectedChange = (event, id) => {
    this.props.handleSelectedChange({
      selected: event.target.checked,
      id: id
    });
  };

  render() {
    const { id, selected, state } = this.props;

    if (state.loading) {
      return <CircularProgress />;
    }

    return (
      <Checkbox
        id="selected"
        color="primary"
        checked={selected}
        onChange={event => this.handleSelectedChange(event, id)}
        disabled={false}
      ></Checkbox>
    );
  }
}

export default CategoryCheckbox;
