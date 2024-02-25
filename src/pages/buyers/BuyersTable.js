import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const BuyersTable = ({ buyers, columns }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ height: '90vh', backgroundColor: 'white' }}>
        <DataGrid
          rows={buyers}
          columns={columns}
          onRowDoubleClick={(params) => navigate(`/acquereurs/${params.id}`)}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[5, 15, 20, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-row:hover': {
              cursor: 'pointer',
            },
            "& .MuiDataGrid-cell": {
              borderBottom: '1px solid lightgrey', 
            }, 
          }}
        />
      </Box>
    </div>
  );
};

export default BuyersTable;