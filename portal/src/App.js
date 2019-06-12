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
        this.props.user.userLoaded ? (<AppBody { ...this.props} />) :
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

class AppBody extends Component {
  render() {
    return (
      <Route path="/app">
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
      </Route>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser())
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(App)
