import { Component } from "react";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import "./Users.scss";

class AttributesBadge extends Component {
  render() {
    const { attributes } = this.props;

    const length = attributes.length;

    if (length === 0) {
      return <></>;
    }

    const first = attributes[0].attribute;

    if (length === 1) {
      return <div className="attribute-badge">{first}</div>;
    }

    const title = attributes.map(a => a.attribute).join(", ");

    return (
      <div>
        <Tooltip title={title}>
          <div className="attribute-badge">
            {first} +{length - 1}
          </div>
        </Tooltip>
      </div>
    );
  }
}

export default AttributesBadge;
