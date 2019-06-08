import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar'
import {Route} from 'react-router-dom'

import './App.scss';
import Content from './components/content/Content';
import { adminLinks } from './pages/admin/Admin';
import { resellerLinks } from './pages/reseller/Reseller';
import { consignorLinks } from './pages/consignor/Consignor';
import { buyerLinks } from './pages/buyer/Buyer';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Navbar />
          <div className="body">
            <Route path="/app/admin"
              links={adminLinks}
              render={(routeProps) => (
                <Content {...routeProps} links={adminLinks} />
              )}
            />

            <Route path="/app/reseller"
              links={adminLinks}
              render={(routeProps) => (
                <Content {...routeProps} links={resellerLinks} />
              )}
            />

            <Route path="/app/consignor"
              links={adminLinks}
              render={(routeProps) => (
                <Content {...routeProps} links={consignorLinks} />
              )}
            />

            <Route path="/app/buyer"
              links={adminLinks}
              render={(routeProps) => (
                <Content {...routeProps} links={buyerLinks} />
              )}
            />
          </div>
        </div>
    );
  }
}

export default App;
