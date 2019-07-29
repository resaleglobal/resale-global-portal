import React, { Component } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Body from "../../components/body/Body";

import { Route, Redirect } from "react-router-dom";
import AdminUsersPage from "../../pages/admin/users/AdminUsersPage";
import AdminSingleUsersPage from "../../pages/admin/users/AdminSingleUsersPage";
import BuyerHistoryPage from "../../pages/buyer/history/BuyerHistoryPage";
import ResellerConsignorsPage from "../../pages/reseller/consignors/ResellerConsignorsPage";
import ResellerConsignorsSinglePage from '../../pages/reseller/consignors/ResellerConsignorsSinglePage';
import ResellerItemsPage from '../../pages/reseller/items/ResellerItemsPage';
import ResellerItemsSinglePage from '../../pages/reseller/items/ResellerItemsSinglePage';
import ResellerCategoriesPage from '../../pages/reseller/categories/ResellerCategoriesPage';
import CreateItemsPage from '../../pages/reseller/items/CreateItemsPage';

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
          <Route exact path="/:domain/admin/users/:userId" component={AdminSingleUsersPage} />

          {/* Routes for reseller */}
          <Route exact path="/:domain/reseller/consignors" component={ResellerConsignorsPage} />
          <Route exact path="/:domain/reseller/consignors/:consignorId" component={ResellerConsignorsSinglePage} />

          <Route exact path="/:domain/reseller/categories" component={ResellerCategoriesPage} />

          <Route exact path="/:domain/reseller/items" component={ResellerItemsPage} />
          <Route exact path="/:domain/reseller/items/create" component={CreateItemsPage} />
          <Route exact path="/:domain/reseller/items/:itemId" component={ResellerItemsSinglePage} />

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
