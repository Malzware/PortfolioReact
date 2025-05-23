// pages/CardGrid.jsx
import * as React from 'react';
import CustomCard from '../components/card.jsx';
import { Box } from '@mui/material';

const cardData = [
    {
        id: 1,
        image: '/src/assets/img/unity1.png',
        title: 'Projet Unity 3D',
        tags: ['React'],
        description: 'Un jeu 3D développé avec Unity.',
        bubbleText: 'Unity 3D ->',
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
        tags: ['Projet Web', 'React'],
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
        tags: ['Scripts'],
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
        tags: ['Mobile'],
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
        title: 'Base de données',
        tags: ['Backend'],
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
        title: 'IA & ML',
        tags: ['IA'],
        description: 'Modèles d\'apprentissage automatique.',
        bubbleText: 'AI/ML',
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
        tags: ['Backend'],
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
        tags: ['DevOps'],
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
        tags: ['Design'],
        description: 'Création de systèmes de design cohérents.',
        bubbleText: 'Design',
        size: 'medium',
        gridColumn: 4,
        gridRow: 4,
        width: 1,
        height: 2
    },
    {
        id: 10,
        image: '/src/assets/img/unity1.png',
        title: 'Blockchain',
        tags: ['Crypto'],
        description: 'Développement sur blockchain.',
        bubbleText: 'Crypto',
        size: 'small',
        gridColumn: 3,
        gridRow: 6,
        width: 1,
        height: 1
    }
];

export default function CardGrid() {
    const [selectedTag, setSelectedTag] = React.useState('Tous');
    const allTags = ['Tous', ...new Set(cardData.flatMap(card => card.tags))];
    
    // Ne plus filtrer les cartes, mais les marquer comme visibles ou non
    const processedCards = cardData.map(card => ({
        ...card,
        isVisible: selectedTag === 'Tous' || card.tags.includes(selectedTag)
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
            {/* Filtres par tags */}
            <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap', px: 2 }}>
                {allTags.map(tag => (
                    <Box
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        sx={{
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            cursor: 'pointer',
                            backgroundColor: selectedTag === tag ? 'primary.main' : 'grey.200',
                            color: selectedTag === tag ? 'white' : 'text.primary',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: selectedTag === tag ? 'primary.dark' : 'grey.300',
                            }
                        }}
                    >
                        {tag}
                    </Box>
                ))}
            </Box>

            {/* Grille mosaïque avec 4 colonnes et trous */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)', // 4 colonnes fixes
                    gridAutoRows: '200px', // Hauteur de base de chaque unité de grille
                    gap: 2, // Espacement entre les blocs (16px)
                    width: '100%',
                    maxWidth: 'calc(100vw - 32px)', // Évite le débordement
                    padding: 2, // Padding intérieur
                    minHeight: '1000px', // Hauteur minimale pour bien voir les trous
                    boxSizing: 'border-box', // Inclut le padding dans la largeur
                    // Responsive
                    '@media (max-width: 600px)': {
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gridAutoRows: '150px',
                        gap: 1,
                        padding: 1,
                        maxWidth: 'calc(100vw - 16px)',
                    },
                    '@media (min-width: 601px) and (max-width: 960px)': {
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gridAutoRows: '180px',
                        gap: 1.5,
                        padding: 1.5,
                        maxWidth: 'calc(100vw - 24px)',
                    },
                    '@media (min-width: 961px)': {
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gridAutoRows: '200px',
                        gap: 2,
                        padding: 2,
                        maxWidth: 'calc(100vw - 32px)',
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
                                        opacity: 0.7,
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