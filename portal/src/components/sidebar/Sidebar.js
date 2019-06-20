import "./Sidebar.scss";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

export const OVERRIDE_SHOW = true;

class Sidebar extends Component {
  render() {
    const { domain } = this.props;
    return (
      <div className="sidebar-container">
        {this.props.links.map(link => {
          return link.show ? (
            <NavLink
              key={link.url}
              to={`/${domain}${link.url}`}
              activeClassName="active-link"
            >
              {link.name}
            </NavLink>
          ) : null;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    domain: state.userAccount.selected.domain
  };
};

export default connect(
  mapStateToProps,
  null
)(Sidebar);
