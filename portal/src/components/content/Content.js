import React, { Component } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Body from "../../components/body/Body";

import { Route, Redirect } from "react-router-dom";
import AdminUsersPage from "../../pages/admin/users/AdminUsersPage";
import BuyerHistoryPage from "../../pages/buyer/history/BuyerHistoryPage";

class Content extends Component {
  render() {
    return (
      <>
        <Sidebar links={this.props.links} />
        <Body {...this.props}>
          {/* Redirects for parent routes */}
          <Route
            exact
            path="/:domain/admin"
            render={props => (
              <Redirect to={`/${props.match.params.domain}/admin/dashboard`} />
            )}
          />
          <Route
            exact
            path="/:domain/reseller"
            render={props => (
              <Redirect
                to={`/${props.match.params.domain}/reseller/dashboard`}
              />
            )}
          />
          <Route
            exact
            path="/:domain/consignor"
            render={props => (
              <Redirect
                to={`/${props.match.params.domain}/consignor/dashboard`}
              />
            )}
          />
          <Route
            exact
            path="/:domain/buyer"
            render={props => (
              <Redirect to={`/${props.match.params.domain}/buyer/history`} />
            )}
          />

          {/* Routes for admin */}
          <Route exact path="/:domain/admin/users" component={AdminUsersPage} />

          {/* Routes for reseller */}

          {/* Routes for consignor */}

          {/* Routes for buyer */}
          <Route
            exact
            path="/:domain/buyer/history"
            component={BuyerHistoryPage}
          />
        </Body>
      </>
    );
  }
}

export default Content;
