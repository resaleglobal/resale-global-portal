import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { isAppLoading } from "../../store/AppSelectors";

class AppLoader extends Component {
  render() {
    if (this.props.isAppLoading) {
      return (
        <div className="app-loader">
          <CircularProgress className="loader" />
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}

const mapStateToProps = state => ({
  isAppLoading: isAppLoading(state)
});

export default connect(
  mapStateToProps,
  null
)(AppLoader);
