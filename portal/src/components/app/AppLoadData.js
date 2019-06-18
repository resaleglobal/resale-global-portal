import React, { Component } from "react";
import { connect } from "react-redux";
import { isUserLoaded } from "../../store/user/UserSelectors";
import { fetchUser } from "../../store/user/UserActions";

class AppLoadData extends Component {
  render() {
    if (!this.props.isUserLoaded) {
      this.props.fetchUser();
    }

    return <>{this.props.children}</>;
  }
}

const mapStateToProps = state => ({
  isUserLoaded: isUserLoaded(state)
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
