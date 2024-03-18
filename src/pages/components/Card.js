const CardComponent = ({ children }) => {
  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    margin: '10px',
    backgroundColor: '#ffffff',
    transition: 'box-shadow 0.3s ease-in-out',
    cursor: 'pointer',
    flexGrow: '1'
  };

  return <div style={cardStyle}>{children}</div>;
};

export default CardComponent;
