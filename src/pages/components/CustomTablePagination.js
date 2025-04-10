import React from 'react';
import TablePagination from '@mui/material/TablePagination';

const CustomTablePagination = ({ rows, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => (
  <TablePagination
    rowsPerPageOptions={[5, 10, 25, 100]}
    component="div"
    count={rows.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
);

export default CustomTablePagination;