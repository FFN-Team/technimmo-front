import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const TableRowProperties = ({ row, columns, navigate }) => (
  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => navigate(`${row.id}`)} style={{ cursor: 'pointer' }}>
    {columns.map((column) => {
      const value =
        column.id === 'property_name'
          ? row.property_name
          : column.id === 'description'
          ? row.description
          : column.id === 'number_of_rooms'
          ? row.number_of_rooms
          : column.id === 'livable_area'
          ? row.livable_area
          : column.id === 'address'
          ? 'n°' +
            row.address.flat_number +
            ', ' +
            (row.address.floor == 0 ? 'ground floor' : 'floor ' + row.address.floor) +
            ', ' +
            row.address.street_number +
            ' ' +
            row.address.street.name +
            ', ' +
            row.address.city.name
          : row[column.id];
      return (
        <TableCell key={column.id} align={column.align}>
          {column.format && typeof value === 'number' ? column.format(value) : value}
        </TableCell>
      );
    })}
  </TableRow>
);

export default TableRowProperties;
