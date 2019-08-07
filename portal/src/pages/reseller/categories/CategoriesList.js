import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "../../../components/section/Section";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CreateCategoriesRow from './CreateCategoriesRow';
import { Button } from "@material-ui/core";
import { fetchResellerCategories, showResellerCategories, hideResellerCategories } from '../../../store/reseller/categories/RCategoriesActions';
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox"
import AttributesBadge from "./AttributesBadge";

class CategoriesList extends Component {
  componentDidMount() {
    this.props.fetchResellerCategories();
  }

  componentWillUnmount() {
    this.props.hideResellerCategories();
  }

  showAddRow = () => {
    this.props.showResellerCategories()
  }

  render() {
    const { categories, loading, show, hasError, error } = this.props;
    return (
      <Section title="Categories">
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
              <TableCell>Category</TableCell>
              <TableCell>Attributes</TableCell>
              <TableCell align='center'>Custom</TableCell>
            </TableRow>
          </TableHead>
          { loading || hasError ? <></> :
          <TableBody>
            {show ? <CreateCategoriesRow></CreateCategoriesRow> : null }
            {categories.map(row => (
                <TableRow key={row.id}>
                  <TableCell>
                    <FormControl
                      required={true}
                      variant="outlined"
                      error={false}
                    >
                      <Checkbox
                        id="selected"
                        color="primary"
                        checked={row.selected}
                        onChange={this.handleSelectedChange}
                        disabled={false}
                      ></Checkbox>
                    </FormControl>
                  </TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.section}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    <AttributesBadge attributes={row.attributes}></AttributesBadge>
                  </TableCell>
                  <TableCell align='center'>{row.custom.toString()}</TableCell>
                </TableRow>
            ))}
          </TableBody> }
        </Table>
        { loading || hasError || categories.length === 0 ? <Section loading={loading} hasError={hasError} error={error}></Section> : <></> }
      </Section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResellerCategories: () => dispatch(fetchResellerCategories()),
    showResellerCategories: () => dispatch(showResellerCategories()),
    hideResellerCategories: () => dispatch(hideResellerCategories()),
  };
};

const mapStateToProps = state => ({
  categories: state.rCategories.all.categories,
  loading: state.rCategories.all.loading,
  hasError: state.rCategories.all.hasError,
  error: state.rCategories.all.error,
  show: state.rCategories.create.show
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesList);
