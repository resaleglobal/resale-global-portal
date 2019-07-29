import React, { Component } from "react";
import { fetchAdminUsers, showInviteUser } from "../../../store/admin/users/AdminUsersActions";
import { connect } from "react-redux";
import Section from "../../../components/section/Section";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import InviteUserRow from './InviteUsers';
import { NavLink } from 'react-router-dom';

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchAdminUsers();
  }

  showAddRow = () => {
    this.props.showInviteUser()
  }

  render() {
    const { users, loading, showInvite } = this.props;
    return (
      <Section title="Reseller Users List" loading={loading}>
        <Button
          color="primary"
          variant="outlined"
          className="section-button"
          onClick={() => this.showAddRow()}
        >Invite User</Button>
        <Table>
          <TableHead className="table-head">
            <TableRow>
              <TableCell></TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Permission</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showInvite ? <InviteUserRow></InviteUserRow> : null }
            {users.map(row => (
                <TableRow component={NavLink} to={`users/${row.id}`} key={row.id}>
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
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.number}</TableCell>
                  <TableCell>
                    <div className="permissions">
                      {row.isAdmin ? <div>Admin</div> : <></>}
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAdminUsers: () => dispatch(fetchAdminUsers()),
    showInviteUser: () => dispatch(showInviteUser()),
  };
};

const mapStateToProps = state => ({
  users: state.adminUsers.users,
  loading: state.adminUsers.loading,
  showInvite: state.adminUsers.invite.show
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
