import { Component } from "react";
import React from "react";
import Section from "../../../../components/section/Section";
import {DropzoneArea} from 'material-ui-dropzone'

import "./Create.scss"

class ImagesSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }

  handleChange = (files) => {
    this.setState({
      files: files
    });

    this.props.imagesCallback(files)
  }

  render() {
    return (
      <Section title="Images">
        <div className="dropzone">
          <DropzoneArea 
            onChange={this.handleChange}
            showPreviews={true}
            showPreviewsInDropzone={false}
            filesLimit={5}
            acceptedFiles={['image/*']}
            showFileNamesInPreview={true}
          />
        </div>
      </Section>
    );
  }
}

export default ImagesSection;
