import './Sidebar.scss';
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";



class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        {this.props.links.map(
          (link) => {
            return <NavLink key={link.url} to={link.url} activeClassName="active-link">{link.name}</NavLink>
          }
        )}
      </div>
    );
  }
}

export default Sidebar;