import React, { Component } from "react";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";

class Searchbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      searchError: ""
    };
  }

  handleChange = key => event => {
    let errorKey = `${key}Error`;
    const value = event.target.value;
    this.setState({
      [key]: value,
      [errorKey]: false
    });

    this.props.handleChange(value);
  };

  render() {
    const { search, searchError } = this.state;

    const loading = false;

    return (
      <FormControl fullWidth={true} variant="outlined" error={searchError}>
        <OutlinedInput
          id="search"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={this.handleChange("search")}
          disabled={loading}
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        ></OutlinedInput>
      </FormControl>
    );
  }
}

export default Searchbox;
