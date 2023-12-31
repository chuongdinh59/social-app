import React from 'react';
import { CircularProgress } from '@mui/material';

function CustomLoading() {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999 // Ensure it's on top of other content
        }}
      >
        <CircularProgress color='success' />
      </div>
      {/* Your other content goes here */}
    </div>
  );
}

export default CustomLoading;
