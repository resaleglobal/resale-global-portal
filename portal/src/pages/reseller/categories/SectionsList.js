import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "../../../components/section/Section";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CreateSectionsRow from './CreateSectionsRow';
import { Button } from "@material-ui/core";
import { fetchResellerSections, showResellerSections } from '../../../store/reseller/sections/RSectionsActions';

class SectionsList extends Component {
  componentDidMount() {
    this.props.fetchResellerSections();
  }

  showAddRow = () => {
    this.props.showResellerSections()
  }

  render() {
    const { sections, loading, show, hasError, error } = this.props;
    return (
      <Section title="Sections">
        <Button
          color="primary"
          variant="outlined"
          className="section-button"
          onClick={() => this.showAddRow()}
        >Create</Button>
        <Table>
          <TableHead className="table-head">
            <TableRow>
              <TableCell>Selected</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Custom</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          { loading || hasError ? <></> :
          <TableBody>
            {show ? <CreateSectionsRow></CreateSectionsRow> : null }
            {sections.map(row => (
                <TableRow key={row.id}>
                  <TableCell></TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.section}</TableCell>
                  <TableCell>{row.custom ? row.custom.toString() : null}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
            ))}
          </TableBody> }
        </Table>
        { loading || hasError || sections.length === 0 ? <Section loading={loading} hasError={hasError} error={error}></Section> : <></> }
      </Section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResellerSections: () => dispatch(fetchResellerSections()),
    showResellerSections: () => dispatch(showResellerSections()),
  };
};

const mapStateToProps = state => ({
  sections: state.rSections.all.sections,
  loading: state.rSections.all.loading,
  hasError: state.rSections.all.hasError,
  error: state.rSections.all.error,
  show: state.rSections.create.show
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionsList);
