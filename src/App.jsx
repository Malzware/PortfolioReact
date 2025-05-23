import './App.css'
import CardGrid from './pages/cardGrid.jsx'
import Header from './components/header.jsx'
import { GlobalStyles, Container } from '@mui/material'

function App() {
  return (
    <>
      <GlobalStyles
        styles={{
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
          },
        }}
      />

      <Header />

      <Container 
        maxWidth={false}
        sx={{ 
          py: 4,
          px: 0,
        }}
      >
        <CardGrid />
      </Container>
    </>
  )
}

export default App
