import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, useTheme, useMediaQuery } from '@mui/material'
import { Canvas } from '@react-three/fiber'
import BlobShader from '../components/blobShader.jsx';

export default function Contact() {
  const [imageVisible, setImageVisible] = useState(false)
  const [textLines, setTextLines] = useState({
    name: false,
    title: false,
    mail: false,
    discord: false,
    linkedin: false,
    cv: false
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))

  useEffect(() => {
    const imageTimer = setTimeout(() => {
      setImageVisible(true)
    }, 200)

    const textTimers = [
      setTimeout(() => setTextLines(prev => ({ ...prev, name: true })), 600),
      setTimeout(() => setTextLines(prev => ({ ...prev, title: true })), 900),
      setTimeout(() => setTextLines(prev => ({ ...prev, mail: true })), 1200),
      setTimeout(() => setTextLines(prev => ({ ...prev, discord: true })), 1400),
      setTimeout(() => setTextLines(prev => ({ ...prev, linkedin: true })), 1600),
      setTimeout(() => setTextLines(prev => ({ ...prev, cv: true })), 1800)
    ]

    return () => {
      clearTimeout(imageTimer)
      textTimers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  // Configuration responsive pour le Canvas
  const canvasConfig = {
    width: isMobile ? 250 : isTablet ? 280 : 300,
    height: isMobile ? 250 : isTablet ? 280 : 300,
    scale: isMobile ? 1.2 : 1.5
  }

  const contactLinks = [
    {
      key: 'mail',
      label: 'Mail',
      href: 'mailto:victor.briaux@example.com?subject=Contact via Portfolio&body=Bonjour Victor,',
      external: false
    },
    {
      key: 'discord',
      label: 'Discord',
      href: 'https://discordapp.com/users/vrouuuuum',
      external: true
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/victor-briaux/',
      external: true
    },
    {
      key: 'cv',
      label: 'CV',
      href: 'https://www.youtube.com/watch?v=bePCRKGUwAY',
      external: true
    }
  ]

  return (
    <Box
      sx={{
        minHeight: { xs: 'calc(100vh - 64px)', md: '750px' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 4, md: 0 }
      }}
    >
      <Grid
        container
        columns={12}
        sx={{
          height: '100%',
          minHeight: { xs: 'auto', md: '750px' },
          maxWidth: '1200px',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' },  // <-- Ajouté ici pour centrer sur mobile
          textAlign: { xs: 'center', md: 'left' }            // <-- Ajouté ici pour texte centré sur mobile
        }}
        spacing={{ xs: 4, md: 0 }}
      >
        {/* Colonne Blob 3D - Ordre 1 sur mobile, 1 sur desktop */}
        <Grid
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'center' },  // <-- Centrage horizontal sur mobile
            order: { xs: 1, md: 1 },
            mb: { xs: 2, md: 0 }
          }}
        >
          <Box
            sx={{
              width: canvasConfig.width,
              height: canvasConfig.height,
              transform: imageVisible ? 'translateY(0)' : 'translateY(100px)',
              opacity: imageVisible ? 1 : 0,
              transition: 'transform 0.8s ease-out, opacity 0.8s ease-out'
            }}
          >
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <BlobShader
                scale={canvasConfig.scale}
                disableClick={false}
                onClick={() => window.open('https://www.youtube.com/watch?v=bePCRKGUwAY', '_blank')}
              />
            </Canvas>
          </Box>
        </Grid>

        {/* Colonne Texte - Ordre 2 sur mobile, 2 sur desktop */}
        <Grid
          xs={12}
          md={8}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-start' },
            order: { xs: 2, md: 2 },
            textAlign: { xs: 'center', md: 'left' }             // <-- Assure centrage texte sur mobile
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '600px',
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 3, md: 4 },
              pl: { xs: 0, md: '20px' },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            {/* Section Titre (optionnel) */}
            <Box sx={{ mb: { xs: 1, md: 2 } }}>
              <Typography
                variant={isMobile ? 'h5' : 'h4'}
                sx={{
                  fontWeight: 'bold',
                  mb: 1,
                  transform: textLines.name ? 'translateY(0)' : 'translateY(30px)',
                  opacity: textLines.name ? 1 : 0,
                  transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
                }}
              >
                Victor Briaux
              </Typography>
              <Typography
                variant={isMobile ? 'body1' : 'h6'}
                color="text.secondary"
                sx={{
                  transform: textLines.title ? 'translateY(0)' : 'translateY(30px)',
                  opacity: textLines.title ? 1 : 0,
                  transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
                  transitionDelay: '0.1s'
                }}
              >
                Web Developer & UI/UX Designer
              </Typography>
            </Box>

            {/* Section Liens */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row', md: 'column' },
                gap: { xs: 2, sm: 4, md: 3 },
                justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' },
                alignItems: { xs: 'center', md: 'flex-start' }
              }}
            >
              {contactLinks.map((link, index) => (
                <Typography
                  key={link.key}
                  variant={isMobile ? 'h6' : 'h5'}
                  component="a"
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  sx={{
                    cursor: 'pointer',
                    color: theme.palette.text.primary,
                    textDecoration: 'none',
                    display: 'block',
                    fontWeight: 'bold',
                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
                    transform: textLines[link.key] ? 'translateY(0)' : 'translateY(30px)',
                    opacity: textLines[link.key] ? 1 : 0,
                    transition: 'all 0.5s ease-out',
                    transitionDelay: `${0.2 + index * 0.1}s`,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: textLines[link.key] ? 'translateY(-2px)' : 'translateY(30px)',
                    },
                    // Style mobile spécifique
                    ...(isMobile && {
                      py: 1,
                      px: 3,
                      borderRadius: 2,
                      backdropFilter: 'blur(10px)',
                      minWidth: '200px',
                      textAlign: 'center',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transform: textLines[link.key] ? 'translateY(-2px) scale(1.02)' : 'translateY(30px)',
                      }
                    })
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}