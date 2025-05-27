// components/Card.jsx
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const getOverlayColorByTag = (tags) => {
    const mainTag = tags[0]?.toLowerCase();
    switch (mainTag) {
        case 'games':
            return '#052843';
        case 'web-development':
            return '#F9CB2E';
        case 'scripts':
            return '#A66455';
        default:
            return 'rgba(0, 0, 0, 0.7)';
    }
};

export default function CustomCard({ image, title, tags = [], bubbleText, description, size, link }) {
    const [hover, setHover] = React.useState(false);

    const getTitleFontSize = () => {
        switch (size) {
            case 'large':
                return 'h6';
            case 'medium':
                return 'subtitle1';
            case 'small':
            default:
                return 'body2';
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

    const handleClick = () => {
        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    const tagColor = getOverlayColorByTag(tags);

    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                cursor: link ? `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:12px;'><text y='50%'>View</text></svg>") 16 0, pointer` : 'default',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 0,
                transition: 'box-shadow 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
                    zIndex: 10,
                }
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}
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

            {/* Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: hover ? tagColor : 'transparent',
                    opacity: hover ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    zIndex: 2,
                    pointerEvents: 'none',
                }}
            />

            {/* Ligne avec carré de couleur et texte */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    display: 'flex',
                    alignItems: 'center',
                    padding: size === 'large' ? '6px 12px' : '4px 8px',
                    borderRadius: '6px',
                    fontSize: getBubbleFontSize(),
                    fontWeight: 600,
                    zIndex: 4,
                    opacity: hover ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                }}
            >
                <Box
                    sx={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '2px',
                        backgroundColor: tagColor,
                        marginRight: '8px',
                    }}
                />
                <Typography
                    variant="caption"
                    color="textPrimary"
                    sx={{ fontWeight: 600, fontSize: 'inherit' }}
                >
                    {bubbleText}
                </Typography>
            </Box>



            {/* Titre + description */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    right: 12,
                    zIndex: 4,
                    textAlign: 'left',
                    opacity: hover ? 1 : 0,
                    transform: hover ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
            >
                <Typography
                    variant={getTitleFontSize()}
                    color="white"
                    sx={{
                        fontWeight: 'bold',
                        mb: 0.5,
                        textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="white"
                    sx={{
                        lineHeight: 1.3,
                        textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                    }}
                >
                    {description}
                </Typography>
            </Box>
        </Card>
    );
}