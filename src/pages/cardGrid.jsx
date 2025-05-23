// pages/CardGrid.jsx
import * as React from 'react';
import CustomCard from '../components/card.jsx';
import { Box, Typography } from '@mui/material';

const cardData = [
    {
        id: 1,
        image: '/src/assets/img/unity1.png',
        title: 'Projet Unity 3D',
        tags: ['GAMES'],
        description: 'Un jeu 3D développé avec Unity.',
        bubbleText: 'Unity 3D',
        size: 'medium',
        gridColumn: 1,
        gridRow: 1,
        width: 1, // largeur en unités de grille
        height: 2 // hauteur en unités de grille
    },
    {
        id: 2,
        image: '/src/assets/img/unity1.png',
        title: 'Site React',
        tags: ['Web-Development'],
        description: 'Un site web moderne réalisé avec React.',
        bubbleText: 'React',
        size: 'large',
        gridColumn: 3,
        gridRow: 1,
        width: 1, // carte plus large
        height: 3 // hauteur en unités de grille
    },
    {
        id: 3,
        image: '/src/assets/img/unity1.png',
        title: 'Scripts Python',
        tags: ['SCRIPTS'],
        description: 'Automatisation avec des scripts Python.',
        bubbleText: 'Python',
        size: 'small',
        gridColumn: 1,
        gridRow: 3,
        width: 1,
        height: 1
    },
    {
        id: 4,
        image: '/src/assets/img/unity1.png',
        title: 'App Mobile',
        tags: ['GAMES'],
        description: 'Une application mobile native.',
        bubbleText: 'Mobile',
        size: 'medium',
        gridColumn: 2,
        gridRow: 2,
        width: 1,
        height: 2
    },
    {
        id: 5,
        image: '/src/assets/img/unity1.png',
        title: 'Développement Web',
        tags: ['Web-Development'],
        description: 'Conception de base de données complexe.',
        bubbleText: 'Database',
        size: 'small',
        gridColumn: 1,
        gridRow: 4,
        width: 1,
        height: 1
    },
    {
        id: 6,
        image: '/src/assets/img/unity1.png',
        title: 'Développement Web',
        tags: ['SCRIPTS'],
        description: 'Conception de base de données complexe.',
        bubbleText: 'Développement Web',
        size: 'large',
        gridColumn: 2,
        gridRow: 4,
        width: 2, // carte plus large
        height: 2
    },
    {
        id: 7,
        image: '/src/assets/img/unity1.png',
        title: 'API REST',
        tags: ['Web-Development'],
        description: 'Développement d\'APIs REST robustes.',
        bubbleText: 'API',
        size: 'small',
        gridColumn: 4,
        gridRow: 2,
        width: 1,
        height: 1
    },
    {
        id: 8,
        image: '/src/assets/img/unity1.png',
        title: 'DevOps',
        tags: ['SCRIPTS'],
        description: 'Automatisation et déploiement continu.',
        bubbleText: 'DevOps',
        size: 'small',
        gridColumn: 4,
        gridRow: 3,
        width: 1,
        height: 1
    },
    {
        id: 9,
        image: '/src/assets/img/unity1.png',
        title: 'Design System',
        tags: ['Web-Development'],
        description: 'Création de systèmes de design cohérents.',
        bubbleText: 'Design',
        size: 'medium',
        gridColumn: 4,
        gridRow: 4,
        width: 1,
        height: 2
    },
];

export default function CardGrid() {
    const [selectedTag, setSelectedTag] = React.useState('ALL');
    const allTags = ['ALL', 'GAMES', 'Web-Development', 'SCRIPTS'];

    // Ne plus filtrer les cartes, mais les marquer comme visibles ou non
    const processedCards = cardData.map(card => ({
        ...card,
        isVisible: selectedTag === 'ALL' || card.tags.includes(selectedTag)
    }));

    // Couleurs pour les petits carrés de remplacement
    const placeholderColors = [
        '#052843', '#F9CB2E', '#A66455', '#9EC1BF',
        '#B79D99', '#523C25', '#ABB194', '#45353C'
    ];

    // Fonction pour obtenir les dimensions CSS Grid selon la position et les dimensions personnalisées
    const getGridDimensions = (card) => {
        return {
            gridColumn: `${card.gridColumn} / span ${card.width}`,
            gridRow: `${card.gridRow} / span ${card.height}`,
        };
    };

    return (
        <Box sx={{
            width: '100%',
            maxWidth: '100vw', // Empêche le débordement horizontal
            overflow: 'hidden' // Empêche tout débordement
        }}>
            {/* Header avec WORK et filtres */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                mb: 4,
                px: 2,
                '@media (max-width: 768px)': {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2,
                }
            }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '6rem' },
                        fontWeight: 900,
                        color: '#000',
                        letterSpacing: '-0.02em',
                        lineHeight: 0.9,
                        margin: 0,
                        flexShrink: 0
                    }}
                >
                    PORTFOLIO
                </Typography>

                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    flexWrap: 'wrap',
                    '@media (max-width: 768px)': {
                        width: '100%',
                    }
                }}>
                    {allTags.map(tag => (
                        <Box
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            sx={{
                                px: 2,
                                py: 1,
                                borderRadius: 0,
                                cursor: 'pointer',
                                color: selectedTag === tag ? '#fff' : '#888', // gris clair si non sélectionné
                                transition: 'all 0.2s ease',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                '&:hover': {
                                    color: selectedTag === tag ? '#fff' : '#fff'
                                }
                            }}
                        >
                            [{tag}]
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Grille mosaïque avec 4 colonnes et trous */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)', // 4 colonnes fixes
                    gridAutoRows: '200px', // Hauteur de base de chaque unité de grille
                    gap: 0, // SUPPRIMÉ : Aucun espacement entre les blocs
                    width: '100%',
                    maxWidth: '100vw', // Évite le débordement
                    padding: 0, // SUPPRIMÉ : Aucun padding intérieur
                    minHeight: '1000px', // Hauteur minimale pour bien voir les trous
                    boxSizing: 'border-box',
                    // Responsive
                    '@media (max-width: 600px)': {
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gridAutoRows: '150px',
                        gap: 0,
                        padding: 0,
                        maxWidth: '100vw',
                    },
                    '@media (min-width: 601px) and (max-width: 960px)': {
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gridAutoRows: '180px',
                        gap: 0,
                        padding: 0,
                        maxWidth: '100vw',
                    },
                    '@media (min-width: 961px)': {
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gridAutoRows: '200px',
                        gap: 0,
                        padding: 0,
                        maxWidth: '100vw',
                    }
                }}
            >
                {processedCards.map((card, index) => (
                    <Box
                        key={card.id}
                        sx={{
                            ...getGridDimensions(card),
                            minHeight: 0, // Important pour éviter les débordements
                            minWidth: 0, // Important pour éviter les débordements
                            // Contour blanc seulement pour les cartes visibles
                            border: card.isVisible ? '1px solid white' : 'none',
                            boxSizing: 'border-box', // S'assure que la bordure est incluse dans les dimensions
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
                            />
                        ) : (
                            // Petit carré coloré de remplacement (plus petit et centré)
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
                                        width: '30%', // Très petit carré
                                        height: '30%',
                                        backgroundColor: placeholderColors[index % placeholderColors.length],
                                        borderRadius: '2px',
                                        opacity: 1,
                                    }}
                                    title={`${card.title} - ${card.tags.join(', ')}`} // Tooltip au survol
                                />
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}