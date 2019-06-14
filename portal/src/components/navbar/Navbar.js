import './Navbar.scss';
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import {connect} from 'react-redux'
import { submitLogout } from '../../store/authorization/AuthActions';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { showReseller, showConsignor, showAdmin, showBuyer } from '../../store/accounts/UserAccountsSelectors';



const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));



class Navbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  setAnchorEl = (el) => {
    this.anchorEl = el
  }

  handleLogout = () => {
    this.handleClose()
    this.props.submitLogout()
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  handleAccountClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  render() {
    let profile = this.props.user.profile
    if (!profile) {
      profile = 'http://torrentcorp.com/wp-content/uploads/Generic-profile-pic-1.gif'
    }

    return (
      <nav className="Navbar">
        <div className="logo-area">
          <img src="/rglogo.png" alt="logo" />
          <div className="title">
            RESALE GLOBAL
          </div>
        </div>
        <div className="links">
          { this.props.showAdmin ? (<NavLink activeClassName="active-link" to="/app/admin">Admin</NavLink>) : (<></>) }
          { this.props.showReseller ? (<NavLink activeClassName="active-link" to="/app/reseller">Reseller</NavLink>) : (<></>) }
          { this.props.showConsignor ? (<NavLink activeClassName="active-link" to="/app/consignor">Consignor</NavLink>) : (<></>) }
          { this.props.showBuyer ? (<NavLink activeClassName="active-link" to="/app/buyer">Buyer</NavLink>) : (<></>) }
        </div>
        <Button className="profile" aria-controls="user-menu" onClick={this.handleAccountClick}  aria-haspopup="true">
          <img src={profile} alt="user profile"></img>
        </Button>
        <StyledMenu id='user-menu' anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </MenuItem>
          <MenuItem onClick={this.handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </StyledMenu>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitLogout: () => dispatch(submitLogout())
  }
}

const mapStateToProps = (state) => {
  return {
    showAdmin: showAdmin(state),
    showConsignor: showConsignor(state),
    showResller: showReseller(state),
    showBuyer: showBuyer(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
