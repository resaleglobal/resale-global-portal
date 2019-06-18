import React, { Component } from "react";
import { connect } from "react-redux";

import { Route, Redirect, Switch } from "react-router-dom";

import { isAppAuthenticated } from "../../store/AppSelectors";
import { protectedDomains } from "../../App";

class AppAuthenticated extends Component {
  render() {
    if (this.props.isAppAuthenticated) {
      return <>{this.props.children}</>;
    }

    return <HandleLoginRedirect />;
  }
}

class HandleLoginRedirect extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/:domain" component={LoginRedirectToDomain} />
      </Switch>
    );
  }
}

class LoginRedirectToDomain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: ""
    };
  }

  componentDidMount() {
    const { domain } = this.props.match.params;
    if (!protectedDomains.includes(domain)) {
      this.setState({
        domain
      });
    }
  }

  render() {
    const url = this.state.domain
      ? `/login?domain=${this.state.domain}`
      : "/login";
    return <Redirect to={url} />;
  }
}

const mapStateToProps = state => ({
  isAppAuthenticated: isAppAuthenticated(state)
});

export default connect(
  mapStateToProps,
  null
)(AppAuthenticated);
