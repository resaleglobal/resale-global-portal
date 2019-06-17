import "./Sidebar.scss";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export const OVERRIDE_SHOW = true;

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        {this.props.links.map(link => {
          return link.show ? (
            <NavLink key={link.url} to={link.url} activeClassName="active-link">
              {link.name}
            </NavLink>
          ) : null;
        })}
      </div>
    );
  }
}

export default Sidebar;
