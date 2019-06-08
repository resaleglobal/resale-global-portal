import React, { Component } from 'react';
import {connect} from 'react-redux'

import Navbar from './components/navbar/Navbar'
import {Route, Redirect} from 'react-router-dom'

import './App.scss';
import Content from './components/content/Content';
import { adminLinks } from './pages/admin/Admin';
import { resellerLinks } from './pages/reseller/Reseller';
import { consignorLinks } from './pages/consignor/Consignor';
import { buyerLinks } from './pages/buyer/Buyer';

class App extends Component {

  state = {}


  render() {
    return (
        <div className="App">
          <Navbar {...this.props} />
          <div className="body">
            <Route path="/app/admin"
              render={(routeProps) => (
                this.props.user.isAdmin ? 
                (<Content {...routeProps} links={adminLinks} />)
                : (<Redirect to="/app" />)
              )}
            />

            <Route path="/app/reseller"
              render={(routeProps) => (
                this.props.user.isReseller ? 
                (<Content {...routeProps} links={resellerLinks} />)
                : (<Redirect to="/app" />)
              )}
            />

            <Route path="/app/consignor"
              render={(routeProps) => (
                this.props.user.isConsignor ? 
                (<Content {...routeProps} links={consignorLinks} />)
                : (<Redirect to="/app" />)
              )}
            />

            <Route path="/app/buyer"
              render={(routeProps) => (
                this.props.user.isBuyer ? 
                (<Content {...routeProps} links={buyerLinks} />)
                : (<Redirect to="/app" />)
              )}
            />
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(
  mapStateToProps
)(App)
