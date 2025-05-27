// pages/CardGrid.jsx
import * as React from 'react';
import CustomCard from '../components/card.jsx';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const cardData = [
    {
        id: 1,
        image: '/src/assets/img/unity1.png',
        title: 'Projet Unity 3D',
        tags: ['GAMES'],
        description: 'Imagination et développement de lieu de vie en 2050, en fonction du scénario en VR, via Unity.',
        bubbleText: 'Unity 3D',
        size: 'large',
        gridColumn: 1,
        gridRow: 1,
        width: 1, // largeur en unités de grille
        height: 2, // hauteur en unités de grille
    },
    {
        id: 2,
        image: '/src/assets/img/unity1.png',
        title: 'Portfolio React',
        tags: ['Web-Development'],
        description: 'Portfolio développé via React + Vite.',
        bubbleText: 'React',
        size: 'large',
        gridColumn: 3,
        gridRow: 1,
        width: 1, // carte plus large
        height: 3, // hauteur en unités de grille
        link: 'https://github.com/Malzware/PortfolioReact' // Exemple de lien
    },
    {
        id: 3,
        image: '/src/assets/img/unity1.png',
        title: 'Scripts NodeJS',
        tags: ['SCRIPTS'],
        description: 'Automatisation de processus via NodeJS dans le cadre de mon stage dans l\'entreprise Cyclovis',
        bubbleText: 'Node JS',
        size: 'large',
        gridColumn: 1,
        gridRow: 3,
        width: 1,
        height: 1,
    },
    {
        id: 4,
        image: '/src/assets/img/unity1.png',
        title: 'App Mobile',
        tags: ['Web-Development'],
        description: 'Portage d\'une application web Angular à destination d\'Androïd.',
        bubbleText: 'Mobile',
        size: 'large',
        gridColumn: 2,
        gridRow: 2,
        width: 1,
        height: 2,
        link: 'https://github.com/Malzware/PokedexMarillAndroid' // Exemple de lien
    },
    {
        id: 5,
        image: '/src/assets/img/unity1.png',
        title: 'Déploiement d\'une nouvelle interface web',
        tags: ['Web-Development'],
        description: 'Déploiement d\'une nouvelle interface web pour le site de la marque Autoradio-GPS.',
        bubbleText: 'Front Dev',
        size: 'large',
        gridColumn: 1,
        gridRow: 4,
        width: 1,
        height: 1,
        link: 'https://www.autoradios-gps.com/'
    },
    {
        id: 6,
        image: '/src/assets/img/unity1.png',
        title: 'Texte',
        tags: ['SCRIPTS'],
        description: 'Texte',
        bubbleText: 'Texte',
        size: 'large',
        gridColumn: 2,
        gridRow: 4,
        width: 2, // carte plus large
        height: 2,
    },
    {
        id: 7,
        image: '/src/assets/img/unity1.png',
        title: 'Texte',
        tags: ['Web-Development'],
        description: 'Texte',
        bubbleText: 'Texte',
        size: 'large',
        gridColumn: 4,
        gridRow: 2,
        width: 1,
        height: 1,
    },
    {
        id: 8,
        image: '/src/assets/img/unity1.png',
        title: 'Texte',
        tags: ['SCRIPTS'],
        description: 'Texte',
        bubbleText: 'Texte',
        size: 'large',
        gridColumn: 4,
        gridRow: 3,
        width: 1,
        height: 1,
        // Pas de lien pour cette carte
    },
    {
        id: 9,
        image: '/src/assets/img/unity1.png',
        title: 'Texte',
        tags: ['Web-Development'],
        description: 'Texte',
        bubbleText: 'Texte',
        size: 'large',
        gridColumn: 4,
        gridRow: 4,
        width: 1,
        height: 2,
    },
];

export default function CardGrid() {
    const [selectedTag, setSelectedTag] = React.useState('ALL');
    const [isMobile, setIsMobile] = React.useState(false);
    const allTags = ['ALL', 'GAMES', 'Web-Development', 'SCRIPTS'];

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const processedCards = cardData.map(card => ({
        ...card,
        isVisible: selectedTag === 'ALL' || card.tags.includes(selectedTag)
    }));

    // Filtrer seulement les cartes visibles pour mobile
    const visibleCards = processedCards.filter(card => card.isVisible);

    const placeholderColors = [
        '#052843', '#F9CB2E', '#A66455', '#9EC1BF',
        '#B79D99', '#523C25', '#ABB194', '#45353C'
    ];

    // ✅ Couleurs spécifiques pour chaque catégorie
    const tagColors = {
        'GAMES': '#F9CB2E',
        'Web-Development': '#9EC1BF',
        'SCRIPTS': '#A66455'
    };

    const getGridDimensions = (card) => {
        return {
            gridColumn: `${card.gridColumn} / span ${card.width}`,
            gridRow: `${card.gridRow} / span ${card.height}`,
        };
    };

    // ✅ Styles des boutons en fonction du thème
    const getButtonStyles = (isSelected) => ({
        p: 0,
        borderRadius: 0,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontSize: '0.9rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        border: '1px solid transparent',
        display: 'flex',
        alignItems: 'center',
        gap: 1,

        // ✅ Couleurs selon le thème et l'état
        ...(isDarkMode ? {
            // Mode sombre
            color: isSelected ? '#fff' : '#888',
            '&:hover': {
                color: '#fff',
            }
        } : {
            // Mode clair
            color: isSelected ? '#000' : '#666',
            '&:hover': {
                color: '#000',
            }
        })
    });

    return (
        <Box sx={{
            width: '100%',
            maxWidth: '100vw',
            overflow: 'hidden',
        }}>
            {/* Header avec filtres */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                mb: 4,
                p: 0,
                '@media (max-width: 768px)': {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2,
                    mb: 3,
                }
            }}>
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    flexWrap: 'wrap',
                    '@media (max-width: 768px)': {
                        width: '100%',
                        justifyContent: 'center',
                        gap: 2,
                    }
                }}>
                    {allTags.map(tag => (
                        <Box
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            sx={getButtonStyles(selectedTag === tag)}
                        >
                            {/* ✅ Carré de couleur à gauche du texte */}
                            <Box
                                sx={{
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: tagColors[tag],
                                    borderRadius: '2px',
                                    opacity: selectedTag === tag ? 1 : 0.7,
                                    transition: 'opacity 0.3s ease',
                                }}
                            />
                            [{tag}]
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Affichage conditionnel : Desktop vs Mobile */}
            {isMobile ? (
                // ✅ Version Mobile : Liste verticale simple
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        width: '100%',
                        padding: '0 16px',
                    }}
                >
                    {visibleCards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            style={{
                                width: '100%',
                                height: '250px', // Hauteur fixe pour mobile
                                minHeight: 0,
                                minWidth: 0,
                                boxSizing: 'border-box',
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: 'easeOut',
                            }}
                        >
                            <CustomCard
                                image={card.image}
                                title={card.title}
                                tags={card.tags}
                                description={card.description}
                                bubbleText={card.bubbleText}
                                size="large" // Taille uniforme sur mobile
                                link={card.link}
                            />
                        </motion.div>
                    ))}
                </Box>
            ) : (
                // ✅ Version Desktop : Grille complexe
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gridAutoRows: '200px',
                        gap: 2,
                        width: '100%',
                        maxWidth: '100vw',
                        padding: 0,
                        minHeight: '1000px',
                        boxSizing: 'border-box',
                        '@media (min-width: 601px) and (max-width: 960px)': {
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gridAutoRows: '180px',
                            gap: 2,
                        },
                        '@media (min-width: 961px)': {
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gridAutoRows: '200px',
                            gap: 2,
                        }
                    }}
                >
                    {processedCards
                        .sort((a, b) => a.gridRow - b.gridRow)
                        .map((card, index) => (
                            <motion.div
                                key={card.id}
                                style={{
                                    ...getGridDimensions(card),
                                    minHeight: 0,
                                    minWidth: 0,
                                    boxSizing: 'border-box',
                                }}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15,
                                    ease: 'easeOut',
                                }}
                            >
                                {card.isVisible ? (
                                    <CustomCard
                                        image={card.image}
                                        title={card.title}
                                        tags={card.tags}
                                        description={card.description}
                                        bubbleText={card.bubbleText}
                                        size={card.size}
                                        link={card.link}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '30%',
                                                height: '30%',
                                                backgroundColor: placeholderColors[index % placeholderColors.length],
                                                borderRadius: '2px',
                                                opacity: 1,
                                            }}
                                            title={`${card.title} - ${card.tags.join(', ')}`}
                                        />
                                    </Box>
                                )}
                            </motion.div>
                        ))}
                </Box>
            )}
        </Box>
    );
}