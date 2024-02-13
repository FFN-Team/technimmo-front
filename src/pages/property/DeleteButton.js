import React from 'react';

const DeleteButton = ({ onClick }) => {
  const style = {
    backgroundColor: '#cc0000',
    color: '#ffffff',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '4px'
  };

  return (
    <button style={style} onClick={onClick}>
      Delete
    </button>
  );
};

export default DeleteButton;
