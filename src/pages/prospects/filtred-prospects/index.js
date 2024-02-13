import React, { useState } from 'react';
import { useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const columns = [
  { field: 'title', headerName: 'Title', width: 80 },
  { field: 'firstName', headerName: 'First name', width: 120, /*editable: true,*/ },
  { field: 'lastName', headerName: 'Last name', width: 120},
  { field: 'dateOfBirth', headerName: 'Date of birth', width: 120 },
  { field: 'profession', headerName: 'Profession', width: 120 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'mobile', headerName: 'Mobile', width: 150 },
  { field: 'contactOrigin', headerName: 'Contact Origin', width: 150 },
];


const FiltredProspects = () => {
  const { filterName } = useParams();
  const [prospects, setProspects] = React.useState([]);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:9001/api/v1/prospects/existing-filter';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prospectFilterName: filterName,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        setProspects(result);
      } catch (error) {
        console.error('Error filtering prospects with existing filter:', error);
      }
    };
    fetchData(); 
  }, [filterName]); 



  return (
    <div>
      <h1>File {filterName}</h1>
      <div style={{ textAlign: 'right' }}>
        <Button 
          variant="outlined" style={{ height: '25px' }} onClick={handleClick1}
        >
          Send email
          <ExpandMoreIcon/>
        </Button>     
        <Menu
          anchorEl={anchorEl1}
          open={Boolean(anchorEl1)}
          onClose={handleClose1}
        >
          <MenuItem>Send presentation email</MenuItem>
          <MenuItem>Send offer email</MenuItem>
        </Menu>

          
        <Button 
          variant="outlined" style={{ height: '25px' }} onClick={handleClick2}
        >
          Generate stats
          <ExpandMoreIcon/>
        </Button>  
        <Menu
          anchorEl={anchorEl2}
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
        >
          <MenuItem>Generate properties to follow</MenuItem>
          <MenuItem>Generate stats 2</MenuItem>
        </Menu>

      </div>

      <Box sx={{ height: 450, width: '100%' }}>
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
}


export default FiltredProspects;