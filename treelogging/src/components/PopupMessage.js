import React from 'react';

const PopupMessage = ({ success, message }) => (
  <div style={{
    background: success ? 'lightgreen' : 'lightcoral',
    padding: '10px',
    border: `1px solid ${success ? 'green' : 'red'}`,
    margin: '10px 0'
  }}>
    {message}
  </div>
);

export default PopupMessage;
