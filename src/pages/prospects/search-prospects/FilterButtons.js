import React from 'react';
import { ButtonGroup, Button, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const FilterButtons = ({ filtersList, handleFilterClick, handleFilterMenuClick, handleDeleteFilterClick, anchorEl, setAnchorEl, currentFilterName }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      {filtersList.map((filter) => (
        <ButtonGroup key={filter.id} variant="outlined" style={{ height: '25px' }}>
          <Button 
            onClick={() => handleFilterClick(filter.prospectFilterName)}
            style={{ textTransform: 'none' }}
          >
            {filter.prospectFilterName}
          </Button>
          <Button style={{ width: '10px' }} onClick={(event) => handleFilterMenuClick(event, filter.prospectFilterName)}>
            <ExpandMoreIcon/>
          </Button>          
        </ButtonGroup>
      ))}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem 
          onClick={() => navigate(`/prospects/filtre/${currentFilterName}`)}
        >
          Ouvrir dossier
        </MenuItem>
        <MenuItem 
          onClick={() => handleDeleteFilterClick(currentFilterName)}
        >
          Supprimer le filtre
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FilterButtons;
