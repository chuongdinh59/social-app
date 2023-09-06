import { Box, Typography } from '@mui/material';
import React from 'react';

const Rightbar = () => {
  return (
    <Box
      flex={2}
      p={2}
      sx={{
        display: { xs: 'none', sm: 'block' },
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' // Add box shadow here
      }}
    >
      <div style={{ textAlign: 'center', padding: '5px' }}>
        <Box
          component='img'
          sx={{
            height: 233,
            width: '100%',
            maxHeight: { xs: 233, md: 167 }
          }}
          alt='The house from the offer.'
          src='https://huongnghiep.hocmai.vn/wp-content/uploads/2022/02/sgl-1555467081-1569935206171.gif'
        />
        <Typography mt={1}>
          {' '}
          <a href='https://ou.edu.vn/'>Truy cập Đại học mở</a>
        </Typography>
      </div>
    </Box>
  );
};

export default Rightbar;
