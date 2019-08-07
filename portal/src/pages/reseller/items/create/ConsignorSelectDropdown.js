import { Component } from "react";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { fetchResellerConsignors } from '../../../../store/reseller/consignors/RConsignorsActions';
import { connect } from "react-redux";



class ConsignorSelectDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      consignor: ''
    };
  }

  componentDidMount() {
    this.props.fetchResellerConsignors();
  }

  handleChange = event => {
    this.setState({
      consignor: event.target.value
    })
    this.props.selectedConsignorIdCallback(event.target.value.id)
  }

  render() {

    const {consignor } = this.state
    const {consignors} = this.props
    const error = false

    return (
      <FormControl
        required={true}
        variant="outlined"
        fullWidth={true}
        error={error}
        className="item-create"
      >
        <InputLabel htmlFor="consignor">Consignor</InputLabel>
        <Select
          value={consignor}
          onChange={this.handleChange}
          input={<OutlinedInput labelWidth={100} name="consignor" id="consignor" />}
        >
          {consignors.map(row => 
            <MenuItem value={row} key={row.id}>{row.name}</MenuItem>
          )}
        </Select>
      </FormControl>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResellerConsignors: () => dispatch(fetchResellerConsignors()),
  };
};

const mapStateToProps = state => ({
  consignors: state.rConsignors.consignors,
  loading: state.rConsignors.loading,
  hasError: state.rConsignors.hasError,
  error: state.rConsignors.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsignorSelectDropdown);
