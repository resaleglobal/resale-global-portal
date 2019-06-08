import './Body.scss';
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";



class Body extends Component {
  render() {
    return (
      <div className="body-container">
        {this.props.children}
      </div>
    );
  }
}

export default Body;