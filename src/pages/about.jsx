import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import BlobShader from '../components/blobShader.jsx';

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const sentenceVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
    const phrases = [
        "Je suis Victor, étudiant en 3ème d'un Bachelor Universitaire et Technologie, Métiers du Multimédia et de l'Internet, parcours Développement Web à l'Université de Montpellier.",
        "Passionné par le design et le web, j'aime associer ces deux passions pour imaginer et déployer mes idées.",
        "Ce portfolio est une vitrine de mon savoir-faire et de ma personnalité créative.",
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

    // Gestion de l'affichage progressif des phrases "Who Am I?"
    const [visibleCount, setVisibleCount] = useState(1);

    useEffect(() => {
        if (visibleCount >= phrases.length) return;

        const interval = setInterval(() => {
            setVisibleCount((count) => Math.min(count + 1, phrases.length));
        }, 3500);

        return () => clearInterval(interval);
    }, [visibleCount, phrases.length]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '14px' }}>
            {/* Section du haut - 60% */}
            <Box sx={{ height: '60%', display: 'flex' }}>
                {/* Haut gauche */}
                <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Canvas style={{ width: '100%', height: 300, cursor: 'pointer' }} camera={{ position: [0, 0, 4] }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <BlobShader />
                    </Canvas>
                </Box>

                {/* Haut droite */}
                <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box style={{ textAlign: 'left' }}>
                        <Typography variant="h1" component="h1" gutterBottom>
                            <span style={{ fontFamily: "'Cormorant', serif" }}>WHO </span>
                            <span style={{ fontFamily: "'Intern', sans-serif" }}>AM I ?</span>
                        </Typography>

                        {phrases.slice(0, visibleCount).map((text, index) => (
                            <motion.div
                                key={index}
                                variants={sentenceVariants}
                                initial="hidden"
                                animate="show"
                                style={{ marginBottom: 12 }}
                            >
                                <Typography variant="body1" color="text.primary">
                                    {text}
                                </Typography>
                            </motion.div>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Section du bas - 40% */}
            <Box sx={{ height: '40%', display: 'flex' }}>
                {/* Bas gauche - Works */}
                <Box sx={{ width: '50%', display: 'flex', alignItems: 'flex-start', justifyContent: 'left' }}>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        style={{ textAlign: 'left' }}
                    >
                        <motion.div variants={sentenceVariants}>
                            <Typography variant="h5" gutterBottom fontWeight={'bold'} sx={{ textDecoration: 'underline' }}>
                                WORKS & PRICES
                            </Typography>
                        </motion.div>
                        <Box sx={{ display: 'flex', gap: 4 }}>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {works.map((work, index) => (
                                    <motion.li key={index} variants={sentenceVariants} style={{ fontWeight: 'bold' }}>
                                        {work}
                                    </motion.li>
                                ))}
                            </ul>
                        </Box>
                    </motion.div>
                </Box>

                {/* Bas droite - Skills */}
                <Box sx={{ width: '50%', display: 'flex', alignItems: 'flex-start', justifyContent: 'left' }}>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        style={{ textAlign: 'left' }}
                    >
                        <motion.div variants={sentenceVariants}>
                            <Typography variant="h5" gutterBottom fontWeight={'bold'} sx={{ textDecoration: 'underline' }}>
                                SKILLS
                            </Typography>
                        </motion.div>
                        <Box sx={{ display: 'flex', gap: 4 }}>
                            {[skills1, skills2].map((group, i) => (
                                <ul key={i} style={{ listStyle: 'none', padding: 0 }}>
                                    {group.map((skill, j) => (
                                        <motion.li key={j} variants={sentenceVariants} style={{ fontWeight: 'bold' }}>
                                            {skill}
                                        </motion.li>
                                    ))}
                                </ul>
                            ))}
                        </Box>
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
};

export default About;