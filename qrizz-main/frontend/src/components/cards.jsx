import React from 'react';
import Paper from '@mui/material/Paper';

const PaperSt = ({ children }) => {
  const paperStyle = {
    height: 220,
    width: 350,
    backgroundColor: '#1A2335' ,
    padding: "20px"// Set the background color here
  };

  return <Paper style={paperStyle}>{children}</Paper>;
};

export default PaperSt;
