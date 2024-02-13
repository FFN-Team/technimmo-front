import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useNavigate } from 'react-router-dom';

import TableRowProperties from './TableRowProperties';
import TablePaginationProperties from './TablePaginationProperties';
import ColumnProperties from './ColumnProperties';
import AddPropertyForm from './AddPropertyForm';

const TableProperties = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetch('http://localhost:9001/api/v1/properties');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setRows(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <AddPropertyForm />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {ColumnProperties.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRowProperties key={row.id} row={row} columns={ColumnProperties} navigate={navigate} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePaginationProperties
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default TableProperties;
