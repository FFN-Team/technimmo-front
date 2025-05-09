import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';


const SearchResults = ({ prospects, columns }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h4>Résultats de la recherche :</h4>

      <Box sx={{ height: '63vh', backgroundColor: 'white' }}>
        <DataGrid
          rows={prospects}
          onRowDoubleClick={(params) => navigate(`/prospects/${params.id}`)}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[5,15,20,50]}
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

export default SearchResults;