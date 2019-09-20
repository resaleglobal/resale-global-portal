import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "../../../components/section/Section";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CategoryCheckbox from "./CategoryCheckbox";

import CreateDepartmentsRow from "./CreateDepartmentsRow";
import { Button } from "@material-ui/core";
import {
  fetchResellerDepartments,
  showResellerDepartments,
  selectResellerDepartments
} from "../../../store/reseller/departments/RDepartmentsActions";

class DepartmentsList extends Component {
  componentDidMount() {
    this.props.fetchResellerDepartments();
  }

  showAddRow = () => {
    this.props.showResellerDepartments();
  };

  handleSelectedChange = params => {
    this.props.selectResellerDepartments(params);
  };

  render() {
    const {
      departments,
      loading,
      show,
      hasError,
      error,
      selectList
    } = this.props;

    return (
      <Section title="Departments">
        <Button
          color="primary"
          variant="outlined"
          className="section-button"
          onClick={() => this.showAddRow()}
        >
          Create
        </Button>
        <Table className="categories-table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell>Selected</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Custom</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {loading || hasError ? (
            <></>
          ) : (
            <TableBody className="table-view">
              {show ? <CreateDepartmentsRow></CreateDepartmentsRow> : null}
              {departments.map(row => (
                <TableRow key={row.id}>
                  <TableCell>
                    <CategoryCheckbox
                      selected={row.selected}
                      id={row.id}
                      handleSelectedChange={this.handleSelectedChange}
                      state={selectList.filter(s => s.id === row.id)[0] || {}}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    {row.custom ? row.custom.toString() : null}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {loading || hasError || departments.length === 0 ? (
          <Section
            loading={loading}
            hasError={hasError}
            error={error}
          ></Section>
        ) : (
          <></>
        )}
      </Section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResellerDepartments: () => dispatch(fetchResellerDepartments()),
    showResellerDepartments: () => dispatch(showResellerDepartments()),
    selectResellerDepartments: params =>
      dispatch(selectResellerDepartments(params))
  };
};

const mapStateToProps = state => ({
  departments: state.rDepartments.all.departments,
  loading: state.rDepartments.all.loading,
  hasError: state.rDepartments.all.hasError,
  error: state.rDepartments.all.error,
  show: state.rDepartments.create.show,
  selectList: state.rDepartments.select
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartmentsList);
