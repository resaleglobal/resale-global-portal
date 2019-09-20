import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "../../../components/section/Section";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CreateCategoriesRow from "./CreateCategoriesRow";
import { Button } from "@material-ui/core";
import {
  fetchResellerCategories,
  showResellerCategories,
  hideResellerCategories,
  selectResellerCategories
} from "../../../store/reseller/categories/RCategoriesActions";
import FormControl from "@material-ui/core/FormControl";
import AttributesBadge from "./AttributesBadge";
import CategoryCheckbox from "./CategoryCheckbox";
import Searchbox from "../../../components/searchbox/Searchbox";

class CategoriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFilter: ""
    };
  }

  componentDidMount() {
    this.props.fetchResellerCategories(this.state);
  }

  componentWillUnmount() {
    this.props.hideResellerCategories();
  }

  showAddRow = () => {
    this.props.showResellerCategories();
  };

  handleSelectedChange = params => {
    this.props.selectResellerCategories(params);
  };

  handleSearch = value => {
    this.setState(
      {
        searchFilter: value
      },
      () => this.fetch(this.state)
    );
  };

  fetch = params => {
    console.log("search", params);
    this.props.fetchResellerCategories(params);
  };

  render() {
    const {
      categories,
      loading,
      show,
      hasError,
      error,
      selectList
    } = this.props;
    return (
      <Section title="Categories">
        <Button
          color="primary"
          variant="outlined"
          className="section-button"
          onClick={() => this.showAddRow()}
        >
          Create
        </Button>
        <div className="search-box">
          <Searchbox handleChange={this.handleSearch} />
        </div>
        <Table>
          <TableHead className="table-head">
            <TableRow>
              <TableCell>Selected</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Attributes</TableCell>
              <TableCell align="center">Custom</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {loading || hasError ? (
            <></>
          ) : (
            <TableBody>
              {show ? <CreateCategoriesRow></CreateCategoriesRow> : null}
              {categories.map(row => (
                <TableRow key={row.id}>
                  <TableCell>
                    <FormControl
                      required={true}
                      variant="outlined"
                      error={false}
                    >
                      <CategoryCheckbox
                        selected={row.selected}
                        id={row.id}
                        handleSelectedChange={this.handleSelectedChange}
                        state={selectList.filter(s => s.id === row.id)[0] || {}}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.section}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    <AttributesBadge
                      attributes={row.attributes}
                    ></AttributesBadge>
                  </TableCell>
                  <TableCell align="center">{row.custom.toString()}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {loading || hasError || categories.length === 0 ? (
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
    fetchResellerCategories: params =>
      dispatch(fetchResellerCategories(params)),
    showResellerCategories: () => dispatch(showResellerCategories()),
    hideResellerCategories: () => dispatch(hideResellerCategories()),
    selectResellerCategories: selected =>
      dispatch(selectResellerCategories(selected))
  };
};

const mapStateToProps = state => ({
  categories: state.rCategories.all.categories,
  loading: state.rCategories.all.loading,
  hasError: state.rCategories.all.hasError,
  error: state.rCategories.all.error,
  show: state.rCategories.create.show,
  selectList: state.rCategories.select
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesList);
