import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid } from '@mui/material'

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

  return (
    <Box sx={{ minHeight: '750px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container sx={{ height: '100%', minHeight: '750px', maxWidth: '1200px' }}>
        {/* Colonne gauche : image - réduite */}
        <Grid xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="/src/assets/img/unity1.png"
            alt="Contact"
            style={{
              width: '300px',
              display: 'block',
              transform: imageVisible ? 'translateY(0)' : 'translateY(100px)',
              opacity: imageVisible ? 1 : 0,
              transition: 'transform 0.8s ease-out, opacity 0.8s ease-out'
            }}
          />
        </Grid>

        {/* Colonne droite : texte - agrandie */}
        <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: 4, pl: '20px' }}>
            <Typography
              variant="p"
              align="left"
              sx={{
                pr: 4,
                transform: textLines.name ? 'translateY(0)' : 'translateY(50px)',
                opacity: textLines.name ? 1 : 0,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out'
              }}
            >
              <strong>
                VICTOR BRIAUX
                <br></br>
                Web Developper
              </strong>
            </Typography>

            <Typography
              variant="p"
              sx={{
                pl: 4,
                transform: textLines.title ? 'translateY(0)' : 'translateY(50px)',
                opacity: textLines.title ? 1 : 0,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
                textAlign: 'left'
              }}
            >
              <strong>
                EXPERIENCE :
                <br></br>
                Intern Web Developper - SAS Cyclovis
                <br></br>
                Student BUT MMI Web Development - Université de Montpellier
              </strong>
            </Typography>

            <Box sx={{ pr: 4 }}>
              <Typography
                variant="p"
                align="left"
                sx={{
                  pr: 4,
                  transform: textLines.name ? 'translateY(0)' : 'translateY(50px)',
                  opacity: textLines.name ? 1 : 0,
                  transition: 'transform 0.6s ease-out, opacity 0.6s ease-out'
                }}
              >
                <strong>
                  CONTACT :
                </strong>
              </Typography>
              
              <Typography
                variant="p"
                component="a"
                href="mailto:victor.briaux@example.com?subject=Contact via Portfolio&body=Bonjour Victor,"
                sx={{
                  cursor: 'pointer',
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block',
                  transform: textLines.mail ? 'translateY(0)' : 'translateY(30px)',
                  opacity: textLines.mail ? 1 : 0,
                  transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
                }}
              >
                Mail
              </Typography>

              <Typography
                variant="p"
                component="a"
                href="https://discordapp.com/users/vrouuuuum"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  cursor: 'pointer',
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block',
                  transform: textLines.discord ? 'translateY(0)' : 'translateY(30px)',
                  opacity: textLines.discord ? 1 : 0,
                  transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
                }}
              >
                Discord
              </Typography>

              <Typography
                variant="p"
                component="a"
                href="https://www.linkedin.com/in/victor-briaux/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  cursor: 'pointer',
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block',
                  transform: textLines.linkedin ? 'translateY(0)' : 'translateY(30px)',
                  opacity: textLines.linkedin ? 1 : 0,
                  transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
                }}
              >
                LinkedIn
              </Typography>
              
              <Typography
                variant="p"
                component="a"
                href="/assets/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  cursor: 'pointer',
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block',
                  transform: textLines.cv ? 'translateY(0)' : 'translateY(30px)',
                  opacity: textLines.cv ? 1 : 0,
                  transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
                }}
              >
                CV
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}