
import { Component } from 'react';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



class BuyerHistoryPage extends Component {

  rows = [
    {id: '1', date: '01/13/2014', cost: "$50.13", item: 'The Awesome Jacket'},
    {id: '1', date: '04/07/2014', cost: "$100.13", item: 'The Awesome Jacket'},
    {id: '1', date: '01/13/2014', cost: "$12.13", item: 'The Awesome Jacket'},
    {id: '1', date: '12/01/2016', cost: "$5000.13", item: 'The Awesome Jacket'},
    {id: '1', date: '01/13/2014', cost: "$122.13", item: 'The Awesome Jacket'}
  ]

  render() {
    return (
      <Table>
      <TableHead className="table-head">
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Cost</TableCell>
          <TableCell>Item</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {this.rows.map(row => (
          <TableRow key={row.id}>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.cost}</TableCell>
            <TableCell>{row.item}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    )
  }
}

export default BuyerHistoryPage