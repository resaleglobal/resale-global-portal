import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "../../../components/section/Section";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { fetchResellerItems } from "../../../store/reseller/items/RItemsActions";
import Searchbox from "../../../components/searchbox/Searchbox";

class ItemsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusFilter: "",
      daysOld: null,
      searchFilter: ""
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    this.props.fetchResellerItems({
      statusFilter: this.state.statusFilter,
      daysOld: this.state.daysOld,
      searchFilter: this.state.searchFilter
    });
  };

  handleSearch = value => {
    this.setState(
      {
        searchFilter: value
      },
      () => this.getItems()
    );
  };

  render() {
    const { items, loading, hasError, error } = this.props;
    return (
      <Section title="Items List">
        <NavLink to={`items/create`}>
          <Button color="primary" variant="outlined" className="section-button">
            Create Item
          </Button>
        </NavLink>
        <div className="search-box">
          <Searchbox handleChange={this.handleSearch} />
        </div>
        <Table style={{ tableLayout: "fixed" }}>
          <TableHead className="table-head">
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>Category</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
        </Table>
        {loading || hasError ? (
          <Section
            loading={loading}
            hasError={hasError}
            error={error}
          ></Section>
        ) : (
          <></>
        )}
        <div style={{ overflow: "auto", height: "500px" }}>
          <Table style={{ tableLayout: "fixed" }}>
            {loading || hasError ? (
              <></>
            ) : (
              <TableBody>
                {items.map(row => (
                  <TableRow
                    component={NavLink}
                    to={`items/single/${row.id}`}
                    key={row.id}
                  >
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.startTime}</TableCell>
                    <TableCell>
                      {row.category ? row.category.displayName : ""}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </Section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResellerItems: params => dispatch(fetchResellerItems(params))
  };
};

const mapStateToProps = state => ({
  items: state.rItems.items,
  loading: state.rItems.loading,
  hasError: state.rItems.hasError,
  error: state.rItems.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsList);
