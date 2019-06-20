import React, { Component } from "react";
import { connect } from "react-redux";
import { isUserLoaded } from "../../store/user/UserSelectors";
import { fetchUser } from "../../store/user/UserActions";
import { isAppLoaded } from "../../store/AppSelectors";

class AppLoadData extends Component {
  render() {
    if (!this.props.isUserLoaded) {
      this.props.fetchUser();
    }

    if (this.props.isAppLoaded) {
      return <>{this.props.children}</>;
    }

    return <></>;
  }
}

const mapStateToProps = state => ({
  isUserLoaded: isUserLoaded(state),
  isAppLoaded: isAppLoaded(state)
});

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(fetchUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLoadData);
