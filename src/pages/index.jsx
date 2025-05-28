import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Typography, Box } from '@mui/material';
import BlobShader from '../components/blobShader.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleBlobClick = () => {
    navigate('/work');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '90vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      {/* Texte derrière le blob */}
      <Typography
        variant="h1"
        sx={{
          position: 'absolute',
          zIndex: 0,
          fontSize: '12vw',
          textAlign: 'center',
          fontWeight: 'bold',
          pointerEvents: 'none',
          userSelect: 'none',
          fontFamily: "'Inter', serif",
        }}
      >
        <Box
          component="span"
          sx={{
            fontFamily: "'Cormorant', serif",
            display: 'block',
          }}
        >
          Victor Briaux
        </Box>
        <Box
          component="span"
          sx={{
            fontFamily: "'Inter', sans-serif",
            display: 'block',
          }}
        >
          Web Developer
        </Box>
      </Typography>

      {/* Canvas avec blob réduit */}
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        <ambientLight />
        <BlobShader scale={0.6} disableClick={false} onClick={handleBlobClick} />
      </Canvas>
    </Box>
  );
};

export default Home;