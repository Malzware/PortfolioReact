import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

export default function Header({ darkMode, toggleTheme }) {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavigation = (path) => {
    navigate(path)
    setMobileOpen(false)
  }

  const navItems = [
    { label: 'Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ]

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header du drawer */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Menu
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation items */}
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                py: 2,
                px: 3,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover
                }
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Theme toggle dans le drawer */}
      <Box
        sx={{
          p: 3,
          borderTop: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="body2">
          {darkMode ? 'Mode sombre' : 'Mode clair'}
        </Typography>
        <IconButton onClick={toggleTheme}>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: darkMode ? '#fff' : '#000',
              border: '1px solid',
              borderColor: darkMode ? '#ccc' : '#333',
            }}
          />
        </IconButton>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          color: theme.palette.text.primary,
          backgroundImage: 'none',
          zIndex: 1100,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          {/* Logo/Title */}
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: { xs: '0.6rem', sm: '1rem' },
              fontWeight: 'bold',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            WEB DEVELOPER & UI / UX DESIGNER
          </Typography>

          {/* Logo court pour mobile */}
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              display: { xs: 'block', sm: 'none' }
            }}
          >
            DEV & DESIGNER
          </Typography>

          {/* Navigation desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    minWidth: 'auto',
                    px: 2
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Button>
              ))}
              
              {/* Theme toggle desktop */}
              <IconButton onClick={toggleTheme} sx={{ ml: 1 }}>
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
          )}

          {/* Menu hamburger mobile */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer pour compenser la hauteur du header fixe */}
      <Toolbar />
    </Box>
  )
}