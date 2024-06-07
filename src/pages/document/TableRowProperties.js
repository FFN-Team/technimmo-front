import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Button from '@mui/material/Button';

const handleNavigate = (url) => {
  window.location.href = url;
};

const handleDownload = (url, event) => {
  event.stopPropagation(); // Empêche la propagation de l'événement
  window.location.href = url;
};

const TableRowProperties = ({ row, columns }) => (
  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => handleNavigate(row.webLink)} style={{ cursor: 'pointer' }}>
    {columns.map((column) => {
      const value =
        column.id === 'document_name'
          ? row.documentId
          : column.id === 'label'
          ? row.name
          : column.id === 'date'
          ? row.date
          : column.id === 'download'
          ? <Button 
          onClick={(event) => handleDownload(row.webContentLink, event)}
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudDownloadIcon />}></Button>
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
