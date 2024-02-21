import React from 'react';

const Table = ({ children }) => (
  <table style={tableStyle}>
    {children}
  </table>
);

const TableHeader = ({ children }) => (
  <thead>
    <tr>
      {children}
    </tr>
  </thead>
);

const TableCell = ({ header, children, onClick }) => (
  header ? (
    <th style={tableHeaderStyle}>{children}</th>
  ) : (
    <td style={tableCellStyle} onClick={onClick}>{children}</td>
  )
);

const TableRow = ({ children }) => (
  <tr>
    {children}
  </tr>
);

const tableStyle = {
  border: '1px solid #ddd',
  borderCollapse: 'collapse',
  width: '100%',
};

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

export { Table, TableHeader, TableCell, TableRow };
