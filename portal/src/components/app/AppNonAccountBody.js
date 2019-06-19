import React from "react";

const AppNonAccountBody = props => (
  <div className="non-account-body">
    {props.header ? (
      <div className="non-account-body-header">{props.header}</div>
    ) : null}
    {props.children}
  </div>
);

export default AppNonAccountBody;
