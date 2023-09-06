import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

const ImageGrid = ({ images, handleToggleModal }) => {
  // Limit the number of images to a maximum of 2
  const limitedImages = images.slice(0, 2);

  return (
    <div style={{ cursor: 'pointer' }} onClick={handleToggleModal}>
      {limitedImages.map((img, index) => (
        <div
          key={index}
          style={{
            width: limitedImages.length === 1 ? '100%' : '50%',
            display: 'inline-block',
            verticalAlign: 'top',
            position: 'relative'
          }}
        >
          <CardMedia
            component='img'
            image={img.url}
            alt={`Image ${index}`}
            sx={{ width: '100%', display: 'block', height: '400px' }}
          />
          {/* Hình 2 && số lượng hình lớn hơn 2  */}
          {index === 1 && images.length > 2 && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '30px'
              }}
            >
              +{images.length - 2}
            </Box>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
