import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './Document.css'; 

const ModalUploadDocument = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [isModalOpen, setModalOpen] = useState(true);

  

  const handleClose = () => {
    setFile(null);
    setMsg('');
    setModalOpen(false);
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2>Upload Document</h2>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Input type='file' onChange={handleFileChange} />
        <Button onClick={handleUpload}>Upload</Button>
        {msg && <span className='upload-message'>{msg}</span>}
      </Box>
    </Modal>
  );
};

export default ModalUploadDocument;
