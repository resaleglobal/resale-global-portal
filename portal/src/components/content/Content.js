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
            path="/app/admin"
            render={() => <Redirect to="/app/admin/dashboard" />}
          />
          <Route
            exact
            path="/app/reseller"
            render={() => <Redirect to="/app/reseller/dashboard" />}
          />
          <Route
            exact
            path="/app/consignor"
            render={() => <Redirect to="/app/consignor/dashboard" />}
          />
          <Route
            exact
            path="/app/buyer"
            render={() => <Redirect to="/app/buyer/history" />}
          />

          {/* Routes for admin */}
          <Route exact path="/app/admin/users" component={AdminUsersPage} />

          {/* Routes for reseller */}

          {/* Routes for consignor */}

          {/* Routes for buyer */}
          <Route exact path="/app/buyer/history" component={BuyerHistoryPage} />
        </Body>
      </>
    );
  }
}

export default Content;
