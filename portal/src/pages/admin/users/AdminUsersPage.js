import { Component } from "react";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { fetchAdminUsers } from "../../../store/admin/users/AdminUsersActions";
import { connect } from "react-redux";

class AdminUsersPage extends Component {
  rows = [
    {
      id: "1",
      name: "Kevyn Hale",
      email: "kevyn@kevynhale.com",
      number: "8019004621",
      permissions: ["Admin", "Reseller"],
      profile:
        "http://www.sardiniauniqueproperties.com/wp-content/uploads/2015/10/square-profile-pic-2.jpg"
    },
    {
      id: "2",
      name: "Kevyn Hale",
      email: "kevyn@kevynhale.com",
      number: "8019004621",
      permissions: ["Reseller"],
      profile:
        "http://www.sardiniauniqueproperties.com/wp-content/uploads/2015/10/square-profile-pic-2.jpg"
    }
  ];

  render() {
    return (
      <Table>
        <TableHead
          className="table-head"
          onClick={() => this.props.fetchAdminUsers()}
        >
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Permission</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.rows.map(row => (
            <TableRow key={row.id}>
              <TableCell align="center" className="table-profile">
                <img src={row.profile} alt="profile"></img>
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.number}</TableCell>
              <TableCell>
                <div className="permissions">
                  {row.permissions.map(p => (
                    <div key={p}>{p}</div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAdminUsers: () => dispatch(fetchAdminUsers())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AdminUsersPage);
