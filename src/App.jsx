import React, { useState, useEffect, useRef } from 'react'
import {
  GlobalStyles,
  Container,
  ThemeProvider,
  CssBaseline,
  createTheme
} from '@mui/material'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import './App.css'
import CardGrid from './pages/cardGrid.jsx'
import Contact from './pages/contact.jsx'
import Header from './components/header.jsx'
import SlidePageTransition from './components/pageTransition.jsx'
import WelcomeLoader from './components/welcomeLoader.jsx'
import About from './pages/about.jsx'

function AnimatedRoutes({ darkMode, toggleTheme, showLoader, setShowLoader, hasVisitedHome }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && !hasVisitedHome.current) {
      setShowLoader(true);
      hasVisitedHome.current = true;
    }
  }, [location.pathname, hasVisitedHome, setShowLoader]);

  return (
    <>
      {!showLoader && <Header darkMode={darkMode} toggleTheme={toggleTheme} />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <SlidePageTransition>
                <Container
                  maxWidth={false}
                  sx={{
                    py: 2,
                    px: 0,
                    '@media (min-width: 600px)': {
                      px: '14px'
                    }
                  }}
                >
                  <CardGrid />
                </Container>
              </SlidePageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <SlidePageTransition>
                <About />
              </SlidePageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <SlidePageTransition>
                <Container
                  maxWidth={false}
                  sx={{
                    py: 2,
                    px: 0,
                    '@media (min-width: 600px)': {
                      px: '14px'
                    }
                  }}
                >
                  <Contact />
                </Container>
              </SlidePageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('darkMode');
    return storedTheme === null ? true : storedTheme === 'true';
  });

  const [showLoader, setShowLoader] = useState(false);
  const hasVisitedHome = useRef(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      h1: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '100px',
        fontWeight: 700,
      },
      h2: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '40px',  // 2.5rem = 40px
        fontWeight: 600,
      },
      h3: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '32px',  // 2rem = 32px
        fontWeight: 600,
      },
      h4: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '24px',  // 1.5rem = 24px
        fontWeight: 500,
      },
      h5: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '20px',  // 1.25rem = 20px
        fontWeight: 500,
      },
      h6: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',  // 1rem = 16px
        fontWeight: 500,
      },
      body1: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',  // 1rem = 16px
      },
      body2: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',  // 0.875rem = 14px
      },
    },
  });

  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          'html, body, #root': {
            height: '100%',
            margin: 0,
            padding: 0,
          },
          html: {
            scrollbarWidth: 'none',
            overflowY: 'scroll',
            backgroundColor: theme.palette.background.default,
            fontFamily: 'Inter, sans-serif',
          },
          body: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            fontFamily: 'Inter, sans-serif',
            '&::WebkitScrollbar?': {
              display: 'none',
            },
          },
          h1: { fontFamily: 'Inter, sans-serif' },
          h2: { fontFamily: 'Inter, sans-serif' },
          h3: { fontFamily: 'Inter, sans-serif' },
          h4: { fontFamily: 'Inter, sans-serif' },
          h5: { fontFamily: 'Inter, sans-serif' },
          h6: { fontFamily: 'Inter, sans-serif' },
          '.MuiCardContent-root:last-child': {
            paddingBottom: '0 !important',
          },
          '#root': {
            margin: '0 !important',
            padding: '0 !important',
            maxWidth: 'none',
            textAlign: 'inherit',
            width: '100%',
          },
          'a.MuiTypography-root': {
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
              textDecoration: 'none',
              color: 'inherit',
              backgroundColor: 'transparent',
            },
          },
          '.MuiButton-root': {
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'inherit',
              textDecoration: 'none',
            },
          },
          '@media (min-width:600px)': {
            '.MuiContainer-root': {
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
            },
          },
        }}
      />

      <WelcomeLoader
        isVisible={showLoader}
        onComplete={handleLoaderComplete}
      />

      <Router>
        <AnimatedRoutes
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          showLoader={showLoader}
          setShowLoader={setShowLoader}
          hasVisitedHome={hasVisitedHome}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
