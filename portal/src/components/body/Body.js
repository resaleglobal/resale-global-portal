import "./Body.scss";
import React, { Component } from "react";

class Body extends Component {
  render() {
    const { endTitleOverride } = this.props;

    const pages = this.props.location.pathname
      .split("/")
      .filter(page => page !== "");

    // Remove the account domain
    pages.shift();

    return (
      <div className="body-container">
        <div className="body-header">
          <ul>
            {pages.map((page, i) =>
              i === pages.length - 1 ? (
                <li className="end-page" key={i}>
                  {endTitleOverride ? endTitleOverride : page}
                </li>
              ) : (
                <li key={i}>{page} /</li>
              )
            )}
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Body;
