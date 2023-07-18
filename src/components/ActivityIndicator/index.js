import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./index.css";

export default ({size, color, style}) => {
  return (
    <Box sx={{ display: 'flex', ...style }}>
      <CircularProgress size={size} color = {color}/>
    </Box>
  );
}
