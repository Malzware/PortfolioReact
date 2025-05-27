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
                position="fixed" // Changé en fixed pour rester au-dessus
                sx={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    color: 'text.primary',
                    backgroundImage: 'none',
                    zIndex: 1100, // Z-index élevé pour rester au-dessus des transitions
                    backdropFilter: 'blur(10px)', // Effet de flou pour un rendu moderne
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="a"
                        href="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'inherit',
                            cursor: 'pointer'
                        }}
                    >
                        DEVELOPER & UI / UX DESIGNER
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
            {/* Spacer pour compenser le header fixe */}
            <Toolbar />
        </Box>
    )
}