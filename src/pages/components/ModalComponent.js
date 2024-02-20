import React from 'react';
import Modal from 'react-modal';
import IconButton from '@mui/material/IconButton';
import CloseOutlined from '@mui/icons-material/CloseOutlined';

const ModalComponent = ({ isOpen, onClose, component }) => {
  const customStyles = {
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%', // Ajustez la largeur selon vos besoins
      maxWidth: '600px', // Limitez la largeur maximale
      maxHeight: '80%', // Limitez la hauteur maximale
      overflow: 'auto',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <IconButton color="error" onClick={onClose}>
      <CloseOutlined />
      </IconButton>
      {component}
    </Modal>
  );
};

export default ModalComponent;
