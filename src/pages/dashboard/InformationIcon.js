import React, { useState } from 'react';

const InformationIcon = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        style={{
          background: '#eee',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          textAlign: 'center',
          lineHeight: '24px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 0 5px rgba(0,0,0,0.15)',
          userSelect: 'none'
        }}
      >
        i
      </div>

      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '500%',
            right: '110%',
            transform: 'translateY(-50%)',
            background: '#333',
            color: '#fff',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            whiteSpace: 'normal',
            maxWidth: '350px',
            width: '350px',
            boxShadow: '0 0 12px rgba(0, 0, 0, 0.25)',
            zIndex: 1000
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default InformationIcon;
