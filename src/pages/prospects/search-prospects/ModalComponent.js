// ModalComponent.js
import React from 'react';
import {
  Button,
  InputLabel,
  TextField,
} from '@mui/material';

const ModalComponent = ({
  showModal,
  prospectFilterName,
  setProspectFilterName,
  handleModalSave,
  handleModalCancel,
}) => {
  return (
    showModal && (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          background: '#fff',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        }}
      >
        <InputLabel htmlFor="filterName">Donne un nom à ce filtre : </InputLabel>
        <TextField
          type="text"
          id="filterName"
          value={prospectFilterName}
          onChange={(e) => setProspectFilterName(e.target.value)}
          variant="outlined"
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <Button variant="contained" onClick={handleModalSave} style={{ marginRight: '10px' }}>
          Enregistrer
        </Button>
        <Button variant="outlined" onClick={handleModalCancel}>
          Annuler
        </Button>
      </div>
    )
  );
};

export default ModalComponent;