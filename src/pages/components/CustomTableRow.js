import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const CustomTableRow = ({ row, columns, navigate, values, navigationDirection }) => (
  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => navigate(`/${navigationDirection}/${row.id}`)} style={{ cursor: 'pointer' }}>
    {columns.map((column) => {
      const value = values(column, row);
      return (
        <TableCell key={column.id} align={column.align}>
          {column.format && typeof value === 'number' ? column.format(value) : value}
        </TableCell>
      );
    })}
  </TableRow>
);

export default CustomTableRow;