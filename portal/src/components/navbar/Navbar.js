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
          <NavLink activeClassName="active-link" to="/app/admin">Admin</NavLink>
          <NavLink activeClassName="active-link" to="/app/reseller">Reseller</NavLink>
          <NavLink activeClassName="active-link" to="/app/consignor">Consignor</NavLink>
          <NavLink activeClassName="active-link" to="/app/buyer">Buyer</NavLink>
        </div>
      </nav>
    );
  }
}

export default Navbar;
