import React from 'react';

const Card = ({ children }) => (
  <div style={cardStyle}>
    {children}
  </div>
);

const cardStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px',
};

export default Card;
