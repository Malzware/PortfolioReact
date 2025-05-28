// pages/CardGrid.jsx
import * as React from 'react';
import CustomCard from '../components/card.jsx';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import BlobShader from '../components/blobShader.jsx'; // Assurez-vous que le chemin est correct

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
        width: 1,
        height: 2,
    },
    {
        id: 2,
        image: '/src/assets/img/sleep1-ps.8b270d24.png',
        title: 'Portfolio React',
        tags: ['Web-Development'],
        description: 'Portfolio développé via React + Vite.',
        bubbleText: 'React',
        size: 'large',
        gridColumn: 3,
        gridRow: 1,
        width: 2,
        height: 3,
        link: 'https://github.com/Malzware/PortfolioReact'
    },
    {
        id: 3,
        image: '/src/assets/img/woodkid1-ps.a05a9780.png',
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
        link: 'https://github.com/Malzware/PokedexMarillAndroid'
    },
    {
        id: 5,
        image: '/src/assets/img/roulezEcolo.png',
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
        image: '/src/assets/img/monk1.b12f1b43.png',
        title: 'Texte',
        tags: ['UI/UX'],
        description: 'Texte',
        bubbleText: 'Texte',
        size: 'large',
        gridColumn: 2,
        gridRow: 4,
        width: 2,
        height: 2,
    },
    {
        id: 9,
        image: '/src/assets/img/maquette-refonte-AGPS-1200-01.jpg',
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
    {
        id: 98,
        image: '',
        title: 'Blob Decoration', // Ce titre ne sera pas affiché
        tags: [], // Pas de tags pour la décoration
        description: 'Élément décoratif',
        bubbleText: '',
        size: 'large',
        gridColumn: 1,
        gridRow: 5,
        width: 1,
        height: 1,
        // ✅ Marquer cette carte comme décorative ET avec le blob
        isDecorative: true,
        showBlob: true
    },
    {
        id: 99,
        image: '',
        title: 'Blob Decoration', // Ce titre ne sera pas affiché
        tags: [], // Pas de tags pour la décoration
        description: 'Élément décoratif',
        bubbleText: '',
        size: 'large',
        gridColumn: 2,
        gridRow: 1,
        width: 1,
        height: 1,
        // ✅ Marquer cette carte comme décorative ET avec le blob
        isDecorative: true,
        showBlob: true
    },
];

export default function CardGrid() {
    const [selectedTag, setSelectedTag] = React.useState('ALL');
    const [isMobile, setIsMobile] = React.useState(false);
    const allTags = ['ALL', 'GAMES', 'Web-Development', 'SCRIPTS', 'UI/UX'];

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
        // ✅ Les éléments décoratifs sont toujours visibles, les autres suivent le filtre
        isVisible: card.isDecorative || selectedTag === 'ALL' || card.tags.includes(selectedTag)
    }));

    // ✅ Filtrer seulement les cartes visibles et non-décoratives pour mobile
    const visibleCards = processedCards.filter(card => card.isVisible && !card.isDecorative);

    const placeholderColors = [
        '#00FF30',  // Vert vif
        '#FF5100',  // Orange vif
        '#DEFF00',  // Jaune vif
        '#FF36C9',  // Rose vif
    ];

    const tagColors = {
        'GAMES': '#00FF30',            // Vert vif
        'Web-Development': '#FF5100', // Orange vif
        'SCRIPTS': '#DEFF00',          // Jaune vif
        'UI/UX': '#FF36C9'             // Rose vif (ajouté pour correspondre aux couleurs données)
    };

    const getGridDimensions = (card) => {
        return {
            gridColumn: `${card.gridColumn} / span ${card.width}`,
            gridRow: `${card.gridRow} / span ${card.height}`,
        };
    };

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

        ...(isDarkMode ? {
            color: isSelected ? '#fff' : '#888',
            '&:hover': {
                color: '#fff',
            }
        } : {
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        width: '100%',
                        padding: '0 16px',
                    }}
                >
                    {/* ✅ Sur mobile, on affiche seulement les vrais projets (pas les éléments décoratifs) */}
                    {visibleCards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            style={{
                                width: '100%',
                                height: '250px',
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
                                size="large"
                                link={card.link}
                            />
                        </motion.div>
                    ))}
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gridAutoRows: '200px',
                        gap: 0,
                        width: '100%',
                        maxWidth: '100vw',
                        padding: 0,
                        minHeight: '1000px',
                        boxSizing: 'border-box',
                        '@media (min-width: 601px) and (max-width: 960px)': {
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gridAutoRows: '180px',
                            gap: 0,
                        },
                        '@media (min-width: 961px)': {
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gridAutoRows: '200px',
                            gap: 0,
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
                                    border: '1px solid white', // <-- ajout de contour blanc autour de chaque cellule
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
                                    card.showBlob ? (
                                        // ✅ Afficher le blob décoratif avec onClick désactivé
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                // ✅ Retirer cursor: 'pointer' car onClick est désactivé
                                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            }}
                                        >
                                            <Canvas camera={{ position: [0, 0, 3] }}>
                                                <ambientLight intensity={0.5} />
                                                <pointLight position={[10, 10, 10]} />
                                                {/* ✅ Passer disableClick={true} pour désactiver le onClick */}
                                                <BlobShader
                                                    disableClick={true}
                                                    scale={1} // Réduire la taille (défaut était 1.5)
                                                />
                                            </Canvas>
                                        </Box>
                                    ) : (
                                        // ✅ Afficher les vraies cartes de projets
                                        <CustomCard
                                            image={card.image}
                                            title={card.title}
                                            tags={card.tags}
                                            description={card.description}
                                            bubbleText={card.bubbleText}
                                            size={card.size || "large"}
                                            link={card.link}
                                            tagColor={tagColors[card.tags[0]] || '#888'}  // Ajout de la couleur du tag principale
                                        />
                                    )
                                ) : (
                                    // ✅ Placeholder pour les cartes filtrées
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