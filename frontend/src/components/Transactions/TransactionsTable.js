// frontend/src/components/Transactions/TransactionsTable.js

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';

const TransactionsTable = ({ transactions, onRefund }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Date</TableCell>
        <TableCell>Donor Name</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>NFC Reader Location</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {transactions.map((transaction) => (
        <TableRow key={transaction.id}>
          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
          <TableCell>{transaction.donor.name}</TableCell>
          <TableCell>${transaction.amount.toFixed(2)}</TableCell>
          <TableCell>{transaction.nfc_reader.location}</TableCell>
          <TableCell>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onRefund(transaction.id)}
            >
              Refund
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default TransactionsTable;
