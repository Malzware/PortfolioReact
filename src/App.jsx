// App.jsx
import './App.css'
import CardGrid from './pages/cardGrid.jsx'
import Contact from './pages/contact.jsx'
import Header from './components/header.jsx'

import {
  GlobalStyles,
  Container,
  ThemeProvider,
  CssBaseline,
  createTheme
} from '@mui/material'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
      },
    },
  })

  const toggleTheme = () => setDarkMode(!darkMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <GlobalStyles
        styles={{
          html: {
            overflowY: 'scroll !important', // Force la scrollbar à être toujours visible
          },
          '.MuiCardContent-root:last-child': {
            paddingBottom: '0 !important',
          },
          '.MuiContainer-root': {
            paddingLeft: '0 !important',
            paddingRight: '0 !important',
          },
          '#root': {
            margin: '0 !important',
            padding: '0 !important',
            maxWidth: 'none',
            textAlign: 'inherit',
            width: '100%',
          },
          '.css-ucqtrl-MuiPaper-root-MuiCard-root': {
            borderRadius: '0 !important',
          },
          '.css-m1b3wi-MuiPaper-root-MuiAppBar-root': {
            backgroundImage: 'none !important'
          }
        }}
      />

      <Router>
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />

        <Container maxWidth={false} sx={{ py: 4, px: 0 }}>
          <Routes>
            <Route path="/" element={<CardGrid />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  )
}

export default App
