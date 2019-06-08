import './Navbar.scss';
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";



class Navbar extends Component {
  render() {
    return (
      <nav className="Navbar">
        <div className="logo-area">
          <img src="/rglogo.png" alt="logo" />
          <div className="title">
            RESALE GLOBAL
          </div>
        </div>
        <div className="links">
          { this.props.user.isAdmin ? (<NavLink activeClassName="active-link" to="/app/admin">Admin</NavLink>) : (<></>) }
          { this.props.user.isReseller ? (<NavLink activeClassName="active-link" to="/app/reseller">Reseller</NavLink>) : (<></>) }
          { this.props.user.isConsignor ? (<NavLink activeClassName="active-link" to="/app/consignor">Consignor</NavLink>) : (<></>) }
          { this.props.user.isBuyer ? (<NavLink activeClassName="active-link" to="/app/buyer">Buyer</NavLink>) : (<></>) }
        </div>
      </nav>
    );
  }
}

export default Navbar;
