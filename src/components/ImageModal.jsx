import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const ImageModal = ({ images, show, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0); // Reset index when modal opens
  }, [show]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (!show) {
    return null; // Don't render anything if the modal is not shown
  }

  return (
    <Modal open={true} onClose={onClose} BackdropComponent={Backdrop}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CardMedia
            component='img'
            height='400px'
            image={images[currentIndex].url}
            alt={`Image ${currentIndex}`}
            sx={{
              width: '100%',
              display: 'block'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
            <Button variant='contained' onClick={handlePrev} disabled={images.length <= 1} sx={{ flex: 1 }}>
              Back
            </Button>
            <Button variant='contained' onClick={handleNext} disabled={images.length <= 1} sx={{ flex: 1 }}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
