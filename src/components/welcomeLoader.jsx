import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeLoader = ({ isVisible, onComplete }) => {
    const theme = useTheme();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(onComplete, 300); 
                        return 100;
                    }
                    return prev + 2; 
                });
            }, 50);

            return () => clearInterval(interval);
        }
    }, [isVisible, onComplete]);
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.palette.background.default, 
                        opacity: 1, 
                    }}
                >
                    <Box
                        sx={{
                            textAlign: 'center',
                            color: theme.palette.text.primary, 
                            px: 4,
                        }}
                    >
                        {/* Animation de la phrase d'accueil */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3,
                                ease: 'easeOut'
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 'bold',
                                    mb: 2,
                                    fontSize: { xs: '2rem', md: '3rem' },
                                    letterSpacing: '2px',
                                    color: theme.palette.text.primary, 
                                }}
                            >
                                VICTOR, STUDENT DEVELOPPER. <br></br>
                                HERE, YOU CAN FIND MY WORK. <br></br>
                                WELCOME ! 
                            </Typography>
                        </motion.div>
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeLoader;





