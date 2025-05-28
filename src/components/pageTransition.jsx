import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material';

const SlidePageTransition = ({ children }) => {
  const theme = useTheme();

  useEffect(() => {
    const body = document.body;
    const originalOverflow = body.style.overflow;
    
    body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      body.style.overflow = originalOverflow;
    }, 600); 

    return () => {
      clearTimeout(timer);
      body.style.overflow = originalOverflow;
    };
  }, []);

  const slideVariants = {
    initial: {
      y: '100vh',
      opacity: 1,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      y: '-100vh',
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.55, 0.06, 0.68, 0.19],
      },
    },
  };

  const contentVariants = {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  return (
    <motion.div
      style={{
        position: 'fixed', 
        top: 0,
        left: 0,
        width: '100vw', 
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        zIndex: 1,
        overflow: 'hidden', 
      }}
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          paddingTop: '64px',
          overflow: 'auto', 

          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div style={{ 
          minHeight: 'calc(100vh - 64px)',
          '&::WebkitScrollbar?': {
            display: 'none',
          },
        }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SlidePageTransition;