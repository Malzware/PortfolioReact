// ./pages/Contact.jsx
import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import contactImage from '../assets/img/unity1.png'

export default function Contact() {
  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Colonne gauche : image */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            height: '100%',
            backgroundImage: `url(${contactImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>

      {/* Colonne droite : texte */}
      <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
        <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography variant="h5" align="left" sx={{ pl: 4 }}>
            Texte
          </Typography>
          <Typography variant="h5" align="right" sx={{ pr: 4 }}>
            Texte
          </Typography>
          <Typography variant="h5" align="left" sx={{ pl: 4 }}>
            Texte
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
