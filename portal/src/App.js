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
import Login from './pages/login/Login'
import { fetchUser } from './store/user/UserActions'

import CircularProgress from '@material-ui/core/CircularProgress';

import { isNewAccount, showAdmin, showBuyer, showConsignor, showReseller } from './store/accounts/UserAccountsSelectors';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { submitLogout } from './store/authorization/AuthActions'




class App extends Component {

  render() {
    return (
        <div className="App">
          { this.props.location.pathname !== '/login' ? (<AuthAppBody {...this.props} />) : <></>}
          <Route exact path="/login" component={Login} />
        </div>
    );
  }
}

class AuthAppBody extends Component {

  getUser = () => {
    this.props.fetchUser()
  }

  render() {
    return (
      <>
      {
        this.props.user.userLoaded ? (<AppPageSection { ...this.props} />) :
          this.props.auth.token !== null ?
            (this.props.user.loadingUser ? <AppLoader /> : this.getUser()) :
            (<Redirect to="/login" />)
      }
      </>
    )
  }
}

class AppLoader extends Component {
  render() {
    return (
      <div className='app-loader'>
        <CircularProgress className="loader" />
      </div>
    )
  }
}

class AppPageSection extends Component {
  render() {
    return (
      <Route path="/app">
        <Navbar {...this.props} />
        <div className="body">
            {
              this.props.user.hasError ? (<AppUserError { ...this.props } />) :
                this.props.isNewAccount ? (<AppNewAccount { ...this.props } />) :
                (<AppPageRoutes { ...this.props } />)
            }
            <AppPageRoutes { ...this.props } />
        </div>
      </Route>
    )
  }
}

class AppUserError extends Component {

  submitLogout = () => {
   this.props.submitLogout()
  }

  render() {
    return (
      <div className="error-container">
        <ErrorOutlineIcon className="error-icon"/>
        <div className="error-message">
          There was an error loading your user data. Try refreshing the page. If the error persists, <span onClick={this.submitLogout} className="link">click here to logout</span> and then log back in. If the issue persists, contact the administrator at admin@resaleglobal.com.
        </div>
      </div>
    )
  }
}

class AppNewAccount extends Component {
  render() {
    return (
      <div>Welcome, time to set up your new account!</div>
    )
  }
}

class AppPageRoutes extends Component {
  render() {
    return (
      <>
      <Route path="/app/admin"
        render={(routeProps) => (
          this.props.showAdmin? 
          (<Content {...routeProps} links={adminLinks} />)
          : (<Redirect to="/app" />)
        )}
      />
      <Route path="/app/reseller"
        render={(routeProps) => (
          this.props.showReseller ? 
          (<Content {...routeProps} links={resellerLinks} />)
          : (<Redirect to="/app" />)
        )}
      />
      <Route path="/app/consignor"
        render={(routeProps) => (
          this.props.showConsignor ? 
          (<Content {...routeProps} links={consignorLinks} />)
          : (<Redirect to="/app" />)
        )}
      />
      <Route path="/app/buyer"
        render={(routeProps) => (
          this.props.showBuyer ? 
          (<Content {...routeProps} links={buyerLinks} />)
          : (<Redirect to="/app" />)
        )}
      />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
  isNewAccount: isNewAccount(state),
  showAdmin: showAdmin(state),
  showConsignor: showConsignor(state),
  showResller: showReseller(state),
  showBuyer: showBuyer(state)
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    submitLogout: () => dispatch(submitLogout())
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(App)
