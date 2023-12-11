import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const TableRowBuyers = ({ row, columns, navigate }) => (
  <TableRow
    hover
    role="checkbox"
    tabIndex={-1}
    key={row.id}
    onClick={() => navigate(`${row.id}`)}
    style={{ cursor: 'pointer' }}
  >
    {columns.map((column) => {
      const value =
        column.id === 'title'
          ? row.prospect.title
          : column.id === 'lastName'
          ? row.prospect.lastName
          : column.id === 'firstName'
          ? row.prospect.firstName
          : column.id === 'mobile'
          ? row.prospect.mobile
          : column.id === 'mail'
          ? row.prospect.mail
          : row[column.id];

      return (
        <TableCell key={column.id} align={column.align}>
          {column.format && typeof value === 'number' ? column.format(value) : value}
        </TableCell>
      );
    })}
  </TableRow>
);

export default TableRowBuyers;
