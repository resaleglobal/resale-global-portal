import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./Section.scss";

class Section extends Component {
  render() {
    const { loading, title, hasError, error } = this.props;

    return (
      <section>
        {loading ? (
          <div className={`loader-container`}>
            <CircularProgress className="loader" />
          </div>
        ) : hasError ? <div className='error'>{error}</div> : (
          <>
            <h1>{title}</h1>
            {this.props.children}
          </>
          )
        }
      </section>
    );
  }
}

export default Section;
