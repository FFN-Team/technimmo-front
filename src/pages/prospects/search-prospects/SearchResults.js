// SearchResults.jsx

import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const SearchResults = ({ prospects, columns }) => {
  return (
    <div>
      <h2>Résultats de la recherche :</h2>

      <Box sx={{ height: 450}}>
        <DataGrid
          rows={prospects}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default SearchResults;
