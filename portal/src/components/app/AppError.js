import React, { Component } from "react";
import { connect } from "react-redux";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { isAppError } from "../../store/AppSelectors";
import AppNonAccountBody from "./AppNonAccountBody";

class AppError extends Component {
  submitLogout = () => {
    this.props.submitLogout();
  };

  render() {
    if (!this.props.isAppError) {
      return <>{this.props.children}</>;
    }

    return (
      <AppNonAccountBody>
        <ErrorOutlineIcon className="error-icon" />
        <div className="error-message">
          There was an error loading the app. Try refreshing the page. If the
          error persists,
          {" "}
          <span onClick={this.submitLogout} className="link">
            click here to logout
          </span>
          {" "}
          and then log back in. If the issue persists, contact the administrator
          at admin@resaleglobal.com.
        </div>
      </AppNonAccountBody>
    );
  }
}

const mapStateToProps = state => ({
  isAppError: isAppError(state)
});

export default connect(
  mapStateToProps,
  null
)(AppError);
