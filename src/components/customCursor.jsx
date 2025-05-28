import * as React from 'react';
import { Box } from '@mui/material';

const CustomCursor = () => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = React.useState(false);
    const [isHoveringCard, setIsHoveringCard] = React.useState(false);

    React.useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = (e) => {
            const target = e.target.closest('[data-has-link="true"]');
            if (target) {
                setIsHoveringCard(true);
                setIsVisible(true);
            }
        };

        const handleMouseLeave = (e) => {
            const target = e.target.closest('[data-has-link="true"]');
            if (!target) {
                setIsHoveringCard(false);
                setIsVisible(false);
            }
        };

        document.addEventListener('mousemove', updatePosition);
        
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);

        return () => {
            document.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseenter', handleMouseEnter, true);
            document.removeEventListener('mouseleave', handleMouseLeave, true);
        };
    }, []);

    if (!isVisible || !isHoveringCard) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                left: position.x,
                top: position.y,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 9999,
                transition: 'opacity 0.2s ease',
            }}
        >
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #FF36C9 0%, #FF1493 100%)',
                    color: 'white',
                    px: 2,
                    py: 1,
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 20px rgba(255, 54, 201, 0.4)',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                        '0%': {
                            transform: 'scale(1)',
                            boxShadow: '0 4px 20px rgba(255, 54, 201, 0.4)',
                        },
                        '50%': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 6px 25px rgba(255, 54, 201, 0.6)',
                        },
                        '100%': {
                            transform: 'scale(1)',
                            boxShadow: '0 4px 20px rgba(255, 54, 201, 0.4)',
                        },
                    },
                }}
            >
                VIEW
            </Box>
        </Box>
    );
};

export default CustomCursor;