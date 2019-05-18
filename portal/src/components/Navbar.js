import './Navbar.scss';
import React, { Component } from 'react';


class Navbar extends Component {
  render() {
    return (
      <nav className="Navbar">
        <div className="logo-area">
          <img src="rglogo.png" alt="logo" />
          <div className="title">
            RESALE GLOBAL
          </div>
        </div>

      </nav>
    );
  }
}

export default Navbar;
