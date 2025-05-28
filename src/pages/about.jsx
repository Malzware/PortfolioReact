import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import BlobShader from '../components/blobShader';

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const sentenceVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // < 960px
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg')); // 600px - 1200px
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
    const isVerySmallMobile = useMediaQuery('(max-width:480px)'); // < 480px

const phrases = [
  "I'm Victor, a third-year Multimedia and Internet Technologies student at the University of Montpellier, specializing in Web Development.",
  "I'm passionate about web development and design, blending creativity with code to bring ideas to life.",
  "I enjoy extreme sports like BMX and Formula 1, cinema (Westerns and sci-fi), and I’m passionate about video games and eSports like Valorant and League of Legends, where I hope to work."
];



    const works = [
        "INTERN WEB DEVELOPER - SAS CYCLOVIS",
        "INTERN GRAPHIST & COMMUNITY MANAGER - PIZZA PIZZA PASTA",
        "MARATHON MMI 2024 - SAS CYCLOVIS",
        "MARATHON MMI 2023 - EDDEC ASSOCIATION",
        "MARATHON MMI 2022 - CELINE PICARD",
        "HACKATHON 2023 - AGDE CITY COUNCIL",
        "HACKATHON 2022 - ENEDIS : Premier Prix",
    ];

    const skills1 = ["HTML", "CSS", "JAVASCRIPT", "ANGULAR", "REACT", "PHP", "SYMFONY", "NODEJS", "LARAVEL", "UNITY"];
    const skills2 = ["TAILWIND CSS", "MATERIAL UI", "MYSQL", "SQLITE", "DOCKER", "GIT", "FIGMA", "ADOBE SUITE"];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: {
                    xs: '12px',
                    sm: '16px',
                    md: '24px',
                    lg: '32px'
                },
                minHeight: { xs: '90vh', md: '90vh' },
                gap: { xs: 2, sm: 3, md: 0 },
                overflow: { xs: 'auto', md: 'hidden' },
            }}
        >
            {/* Section principale - Layout adaptatif */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    height: { xs: 'auto', md: '60%' },
                    gap: { xs: 3, sm: 4, md: 0 },
                    mb: { xs: 3, md: 0 },
                    flex: { xs: 'none', md: 1 },
                }}
            >
                {/* Section Blob 3D */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        height: {
                            xs: '280px',
                            sm: '320px',
                            md: '100%'
                        },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        order: { xs: 2, md: 1 },
                        px: { xs: 1, sm: 2 },
                    }}
                >
                    <Box
                        sx={{
                            width: {
                                xs: '240px',
                                sm: '260px',
                                md: '300px',
                                lg: '350px'
                            },
                            height: {
                                xs: '240px',
                                sm: '260px',
                                md: '300px',
                                lg: '350px'
                            },
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }}
                    >
                        <Canvas
                            style={{ width: '100%', height: '100%' }}
                            camera={{ position: [0, 0, 4] }}
                        >
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <BlobShader
                                disableClick={false}           // active le clic
                                disableCursorChange={false}    // active le curseur pointer
                                onClick={() => window.open('/assets/cv.pdf', '_blank')} />
                        </Canvas>
                    </Box>
                </Box>

                {/* Section Présentation */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        display: 'flex',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        justifyContent: 'left',
                        order: { xs: 1, md: 2 },
                        textAlign: { xs: 'center', sm: 'left' },
                    }}
                >
                    <Box sx={{
                        maxWidth: { xs: '100%', md: '90%' },
                        width: '100%'
                    }}>
                        <Typography
                            variant="h1"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontFamily: "'Inter', serif",
                                mb: { xs: 2, sm: 3, md: 4 },
                                display: 'flex',
                                alignItems: 'baseline',
                                flexWrap: 'wrap',
                                gap: { xs: 0.5, sm: 1 },
                                justifyContent: { xs: 'center', sm: 'flex-start' },
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    fontFamily: "'Cormorant', serif",
                                    fontSize: {
                                        xs: '36px',
                                        sm: '60px',
                                        md: '80px',
                                        lg: '100px',
                                    },
                                    lineHeight: { xs: 0.9, md: 1 },
                                }}
                            >
                                WHO
                            </Box>
                            <Box
                                component="span"
                                sx={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: {
                                        xs: '30px',
                                        sm: '50px',
                                        md: '70px',
                                        lg: '92px',
                                    },
                                    lineHeight: { xs: 0.9, md: 1 },
                                }}
                            >
                                AM I ?
                            </Box>
                        </Typography>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            {phrases.map((text, index) => (
                                <motion.div
                                    key={index}
                                    variants={sentenceVariants}
                                    style={{
                                        marginBottom: isVerySmallMobile ? 12 : isSmallMobile ? 14 : 20,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        color="text.primary"
                                        sx={{
                                            fontSize: {
                                                xs: '0.85rem',
                                                sm: '0.95rem',
                                                md: '1.1rem'
                                            },
                                            lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                                        }}
                                    >
                                        {text}
                                    </Typography>
                                </motion.div>
                            ))}
                        </motion.div>
                    </Box>
                </Box>
            </Box>

            {/* Section du bas - Works & Skills */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    height: { xs: 'auto', md: '40%' },
                    gap: { xs: 3, sm: 4, md: 0 },
                    mt: { xs: 1, md: 0 },
                    flex: { xs: 'none', md: 1 },
                }}
            >
                {/* Section Works */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: { xs: 'center', md: 'left' },
                        pr: { md: 2 },
                        px: { xs: 1, sm: 2, md: 0 },
                    }}
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        style={{
                            textAlign: isSmallMobile ? 'center' : 'left',
                            width: '100%',
                        }}
                    >
                        <motion.div variants={sentenceVariants}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                fontWeight="bold"
                                sx={{
                                    textDecoration: 'underline',
                                    fontSize: {
                                        xs: '1rem',
                                        sm: '1.2rem',
                                        md: '1.5rem'
                                    },
                                    mb: { xs: 1.5, sm: 2, md: 3 },
                                }}
                            >
                                WORK & PRIZE
                            </Typography>
                        </motion.div>
                        <Box
                            component="ul"
                            sx={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            {works.map((work, index) => (
                                <motion.li
                                    key={index}
                                    variants={sentenceVariants}
                                    style={{
                                        fontWeight: 'bold',
                                        marginBottom: isVerySmallMobile ? 6 : isSmallMobile ? 8 : 12,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: {
                                                xs: '0.75rem',
                                                sm: '0.85rem',
                                                md: '1rem'
                                            },
                                            lineHeight: { xs: 1.3, md: 1.4 },
                                        }}
                                    >
                                        {work}
                                    </Typography>
                                </motion.li>
                            ))}
                        </Box>
                    </motion.div>
                </Box>

                {/* Section Skills */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: { xs: 'center', md: 'left' },
                        px: { xs: 1, sm: 2, md: 0 },
                    }}
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        style={{
                            textAlign: isSmallMobile ? 'center' : 'left',
                            width: '100%',
                        }}
                    >
                        <motion.div variants={sentenceVariants}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                fontWeight="bold"
                                sx={{
                                    textDecoration: 'underline',
                                    fontSize: {
                                        xs: '1rem',
                                        sm: '1.2rem',
                                        md: '1.5rem'
                                    },
                                    mb: { xs: 1.5, sm: 2, md: 3 },
                                }}
                            >
                                SKILL
                            </Typography>
                        </motion.div>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: { xs: 1.5, sm: 2 },
                                justifyContent: { xs: 'center', sm: 'flex-start' },
                                alignItems: { xs: 'center', sm: 'flex-start' },
                            }}
                        >
                            {[skills1, skills2].map((group, i) => (
                                <Box
                                    key={i}
                                    component="ul"
                                    sx={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: 0,
                                        flex: 'unset',
                                        maxWidth: { xs: '100%', sm: '160px' },
                                        mr: i === 0 ? { xs: 0, sm: 2 } : 0,
                                        width: { xs: '100%', sm: 'auto' },
                                    }}
                                >
                                    {group.map((skill, index) => (
                                        <motion.li
                                            key={index}
                                            variants={sentenceVariants}
                                            style={{
                                                marginBottom: isVerySmallMobile ? 6 : 8
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: {
                                                        xs: '0.75rem',
                                                        sm: '0.85rem',
                                                        md: '1rem',
                                                    },
                                                    lineHeight: { xs: 1.3, md: 1.4 },
                                                }}
                                            >
                                                {skill}
                                            </Typography>
                                        </motion.li>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
};

export default About;