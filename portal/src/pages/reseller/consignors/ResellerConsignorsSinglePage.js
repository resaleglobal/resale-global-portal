import { Component } from "react";
import { connect } from "react-redux";
import React from "react";
import Section from "../../../components/section/Section";
import { fetchResellerSingleConsignor } from "../../../store/reseller/single-consignor/RSingleConsignorActions";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import renderHTML from "react-render-html";

import "react-responsive-carousel/lib/styles/carousel.min.css";

class ResellerConsignorsSinglePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      consignorId: ""
    };
  }

  componentDidMount() {
    const { consignorId } = this.props.match.params;
    this.setState(
      {
        consignorId: consignorId
      },
      () => this.fetch(this.state)
    );
  }

  fetch = params => {
    this.props.fetchResellerSingleConsignor(params);
  };

  render() {
    const { consignor } = this.props;
    return (
      <>
        <Section title="Info">
          {consignor ? (
            <div className="info-section">
              <div className="single-item-table">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name:</TableCell>
                      <TableCell>{consignor.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Number:</TableCell>
                      <TableCell>{consignor.number}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email:</TableCell>
                      <TableCell>{consignor.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Address:</TableCell>
                      <TableCell>{consignor.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Items:</TableCell>
                      <TableCell>{consignor.itemCount}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Section>
        <Section title="Users">
          {consignor ? (
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Main Contact</TableCell>
                  <TableCell>Registered</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {consignor.users.map(u => (
                  <TableRow>
                    <TableCell>{u.firstName}</TableCell>
                    <TableCell>{u.lastName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.number}</TableCell>
                    <TableCell>{u.mainContact.toString()}</TableCell>
                    <TableCell>{u.isRegistered.toString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <></>
          )}
        </Section>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResellerSingleConsignor: params =>
      dispatch(fetchResellerSingleConsignor(params))
  };
};

const mapStateToProps = state => ({
  consignor: state.rSingleConsignor.consignor,
  loading: state.rSingleConsignor.loading,
  hasError: state.rSingleConsignor.hasError,
  error: state.rSingleConsignor.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResellerConsignorsSinglePage);
