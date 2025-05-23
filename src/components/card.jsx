// components/Card.jsx
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CustomCard({ image, title, tags = [], bubbleText, description, size }) {
    const [hover, setHover] = React.useState(false);
    const [animatedText, setAnimatedText] = React.useState('');

    React.useEffect(() => {
        if (!hover) {
            setAnimatedText('');
            return;
        }

        const chars = '!<>-_\\/[]{}—=+*^?#________';
        const fullText = description || '';
        const scrambleIterations = 10;
        let currentIteration = 0;

        const scramble = () => {
            if (currentIteration < scrambleIterations) {
                let scrambled = '';
                for (let i = 0; i < fullText.length; i++) {
                    scrambled += chars[Math.floor(Math.random() * chars.length)];
                }
                setAnimatedText(scrambled);
                currentIteration++;
            } else {
                setAnimatedText(fullText);
                clearInterval(interval);
            }
        };

        const interval = setInterval(scramble, 40);
        return () => clearInterval(interval);
    }, [hover, description]);

    // Déterminer la taille de police selon la taille de la carte
    const getTitleFontSize = () => {
        switch (size) {
            case 'large':
                return 'h5';
            case 'medium':
                return 'h6';
            case 'small':
            default:
                return 'body1';
        }
    };

    const getBubbleFontSize = () => {
        switch (size) {
            case 'large':
                return '0.9rem';
            case 'medium':
                return '0.8rem';
            case 'small':
            default:
                return '0.7rem';
        }
    };

    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Ombre légère par défaut
                '&:hover': {
                    transform: 'scale(1.03)', // Légèrement plus d'effet avec les espacements
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
                    zIndex: 10,
                }
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <CardContent sx={{ p: 0, flexGrow: 1, position: 'relative', zIndex: 1 }}>
                <img
                    src={image}
                    alt={title}
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            </CardContent>

            {/* Overlay avec gradient */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: hover 
                        ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.9), rgba(156, 39, 176, 0.9))'
                        : 'transparent',
                    opacity: hover ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    zIndex: 2,
                    pointerEvents: 'none',
                }}
            />

            {/* Titre centré */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3,
                    opacity: hover ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                    transform: hover ? 'translateY(0)' : 'translateY(20px)',
                }}
            >
                <Typography 
                    variant={getTitleFontSize()} 
                    color="white" 
                    sx={{ 
                        textAlign: 'center', 
                        px: 2,
                        fontWeight: 'bold',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}
                >
                    {title}
                </Typography>
            </Box>

            {/* Bulle texte */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: 'black',
                    padding: size === 'large' ? '6px 12px' : '4px 8px',
                    borderRadius: '16px',
                    fontSize: getBubbleFontSize(),
                    fontWeight: 600,
                    zIndex: 4,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    backdropFilter: 'blur(4px)',
                }}
            >
                <Typography 
                    variant="caption" 
                    color="textPrimary" 
                    sx={{ 
                        fontWeight: 600,
                        fontSize: 'inherit'
                    }}
                >
                    {bubbleText}
                </Typography>
            </Box>

            {/* Description animée */}
            {hover && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        right: 12,
                        padding: size === 'large' ? '8px 16px' : '6px 12px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderRadius: '8px',
                        fontSize: size === 'large' ? '0.9rem' : '0.8rem',
                        zIndex: 4,
                        textAlign: 'center',
                        backdropFilter: 'blur(4px)',
                    }}
                >
                    <Typography 
                        variant="body2" 
                        color="white"
                        sx={{ 
                            fontSize: 'inherit',
                            lineHeight: 1.3
                        }}
                    >
                        {animatedText}
                    </Typography>
                </Box>
            )}
        </Card>
    );
}