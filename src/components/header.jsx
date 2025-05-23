// Header.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@mui/material'

export default function Header({ darkMode, toggleTheme }) {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          color: 'text.primary'
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 'bold'
            }}
          >
            =)
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              color="inherit"
              sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 'bold' }}
              onClick={() => navigate('/')}
            >
              Work
            </Button>
            <Button
              color="inherit"
              sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 'bold' }}
              onClick={() => navigate('/about')}
            >
              About
            </Button>
            <Button
              color="inherit"
              sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 'bold' }}
              onClick={() => navigate('/contact')}
            >
              Contact
            </Button>

            <IconButton onClick={toggleTheme}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: darkMode ? '#fff' : '#000',
                  border: '1px solid',
                  borderColor: darkMode ? '#ccc' : '#333',
                }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
