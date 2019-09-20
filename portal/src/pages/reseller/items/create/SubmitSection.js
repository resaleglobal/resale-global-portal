import { Component } from "react";
import React from "react";
import { Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import "./Create.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import queryString from "query-string";

class SubmitSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    if (params.consignorId) {
      this.setState({
        selected: true
      });

      this.props.checkCreateAnother(true);
    }
  }

  handleSelectedChange = event => {
    const checked = event.target.checked;
    this.setState({
      selected: checked
    });

    this.props.checkCreateAnother(checked);
  };

  render() {
    const { selected } = this.state;
    const { loading } = this.props;
    return (
      <div>
        <Button
          color="primary"
          variant="outlined"
          onClick={this.props.create}
          className="submit-button"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress className="login-loader" />
          ) : (
            "Create Item"
          )}
        </Button>
        <Checkbox
          id="selected"
          color="primary"
          checked={selected}
          onChange={this.handleSelectedChange}
        ></Checkbox>
        <span className="create-another">Create Another</span>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => ({
  loading: state.rItems.create.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitSection);
