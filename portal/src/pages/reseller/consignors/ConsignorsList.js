import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "../../../components/section/Section";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import InviteConsignorRow from "./InviteConsignors";
import {
  fetchResellerConsignors,
  showInviteConsignor
} from "../../../store/reseller/consignors/RConsignorsActions";
import { NavLink } from "react-router-dom";
import Searchbox from "../../../components/searchbox/Searchbox";

class ConsignorsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFilter: ""
    };
  }

  componentDidMount() {
    this.fetch(this.state);
  }

  showAddRow = () => {
    this.props.showInviteConsignor();
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
    this.props.fetchResellerConsignors(params);
  };

  render() {
    const { consignors, loading, showInvite, hasError, error } = this.props;
    return (
      <Section title="Consignors List">
        <Button
          color="primary"
          variant="outlined"
          className="section-button"
          onClick={() => this.showAddRow()}
        >
          Invite Consignor
        </Button>
        <div className="search-box">
          <Searchbox handleChange={this.handleSearch} />
        </div>
        <Table>
          <TableHead className="table-head">
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Account</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Number</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {loading || hasError ? (
            <></>
          ) : (
            <TableBody>
              {showInvite ? <InviteConsignorRow></InviteConsignorRow> : null}
              {consignors.map(row => (
                <TableRow
                  component={NavLink}
                  to={`consignors/${row.id}`}
                  key={row.id}
                >
                  <TableCell align="center" className="table-profile">
                    {row.avatar ? (
                      <img src={row.avatar} alt="profile"></img>
                    ) : (
                      <img
                        src="https://i.stack.imgur.com/34AD2.jpg"
                        alt="profile"
                      ></img>
                    )}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.number}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
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
      </Section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResellerConsignors: params =>
      dispatch(fetchResellerConsignors(params)),
    showInviteConsignor: () => dispatch(showInviteConsignor())
  };
};

const mapStateToProps = state => ({
  consignors: state.rConsignors.consignors,
  loading: state.rConsignors.loading,
  hasError: state.rConsignors.hasError,
  error: state.rConsignors.error,
  showInvite: state.rConsignors.invite.show
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsignorsList);
