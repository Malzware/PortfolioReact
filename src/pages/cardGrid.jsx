import * as React from 'react';
import CustomCard from '../components/card.jsx';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import BlobShader from '../components/blobShader.jsx';
import CustomCursor from '../components/customCursor.jsx';

const cardData = [
    {
        id: 1,
        image: '/src/assets/img/unity1.png',
        title: 'Unity 3D Project',
        tags: ['GAMES'],
        description: 'Imagination and development of a living environment in 2050, based on the VR scenario, using Unity.',
        bubbleText: 'Unity 3D, Oculus Rift',
        size: 'large',
        gridColumn: 1,
        gridRow: 1,
        width: 1,
        height: 2,
    },
    {
        id: 2,
        image: '/src/assets/img/sleep1-ps.8b270d24.png',
        title: 'Sleep Application Prototype',
        tags: ['UI/UX'],
        description: 'Design and prototyping of a mobile app aimed at helping students sleep better.',
        bubbleText: 'UI/UX, Figma',
        size: 'large',
        gridColumn: 3,
        gridRow: 1,
        width: 2,
        height: 3,
        link: 'https://www.figma.com/design/43faT7YiX7dfLep2vs29sl/Untitled?node-id=0-1&t=PMxZ6ZdiWPFxb1tf-1'
    },
    {
        id: 3,
        image: '/src/assets/img/woodkid1-ps.a05a9780.png',
        title: 'Woodkid Website Prototype',
        tags: ['UI/UX'],
        description: 'Created a website prototype to showcase the artist Woodkid and his universe. Both Web and Mobile versions.',
        bubbleText: 'UI/UX, Figma',
        size: 'large',
        gridColumn: 1,
        gridRow: 3,
        width: 1,
        height: 1,
        link: 'https://www.figma.com/design/Fchp3ozJ3eij15NuMeCf9K/Untitled?node-id=0-1&t=RZ5jCgvEVlhMRqdG-1'
    },
    {
        id: 4,
        image: '/src/assets/img/pink.png',
        title: 'Portfolio',
        tags: ['Web-Development'],
        description: 'Concept and development of my portfolio.',
        bubbleText: 'React, Vite, Portfolio',
        size: 'large',
        gridColumn: 2,
        gridRow: 2,
        width: 1,
        height: 2,
        link: 'https://github.com/Malzware/PortfolioReact'
    },
    {
        id: 5,
        image: '/src/assets/img/RoulezEcoloMockUp.png',
        title: 'E-commerce Tool Development',
        tags: ['Web-Development'],
        description: 'Developed a web calculator comparing consumption of electric vs combustion vehicles for an e-commerce site.',
        bubbleText: 'CMS, Front Dev',
        size: 'large',
        gridColumn: 1,
        gridRow: 4,
        width: 1,
        height: 1,
        link: 'https://www.roulezecolo.com/calcul-deconomie-scooter-thermique-vs-electrique.html'
    },
    {
        id: 6,
        image: '/src/assets/img/MonkeysInvasion.png',
        title: 'Monkey\'s Invasion Video Game',
        tags: ['GAMES'],
        description: 'Developed a video game in JavaScript using the Phaser library.',
        bubbleText: 'JavaScript, Phaser',
        size: 'large',
        gridColumn: 2,
        gridRow: 4,
        width: 2,
        height: 2,
        link: 'https://codesandbox.io/p/sandbox/sae301-groupe-alolas-dugtrio-chef-briaux-victor-forked-gknq8m'
    },
    {
        id: 7,
        image: '/src/assets/img/ATGPS.png',
        title: 'Autoradio-GPS',
        tags: ['Web-Development'],
        description: 'Developed scripts to automate various tasks using NodeJS and APIs. Redesigned the homepage of the website.',
        bubbleText: 'NodeJS, API',
        size: 'large',
        gridColumn: 4,
        gridRow: 4,
        width: 1,
        height: 2,
        link: 'https://www.autoradios-gps.com/'
    },
    {
        id: 8,
        image: '/src/assets/img/Pokemon.png',
        title: 'Pokédex Website',
        tags: ['Web-Development'],
        description: 'Developed a "Pokédex" website from a mockup by another student, using Laravel, Angular & TailwindCSS.',
        bubbleText: 'Laravel, Angular, TailwindCSS',
        size: 'large',
        gridColumn: 1,
        gridRow: 6,
        width: 3,
        height: 3,
        link: 'https://github.com/Malzware/Pokedex'
    },
    {
        id: 9,
        image: '',
        title: 'Your Project',
        tags: [''],
        description: 'Have a specific idea or need? Let\'s talk!',
        bubbleText: 'Custom-made',
        size: 'large',
        gridColumn: 4,
        gridRow: 8,
        width: 1,
        height: 1,
        link: 'http://localhost:5173/contact',
        isCustomProject: true
    },
    {
        id: 98,
        image: '',
        title: 'Blob Decoration',
        tags: [],
        description: 'Decorative element',
        bubbleText: '',
        size: 'large',
        gridColumn: 4,
        gridRow: 6,
        width: 1,
        height: 2,
        isDecorative: true,
        showBlob: true
    },
    {
        id: 97,
        image: '',
        title: 'Blob Decoration',
        tags: [],
        description: 'Decorative element',
        bubbleText: '',
        size: 'large',
        gridColumn: 1,
        gridRow: 5,
        width: 1,
        height: 1,
        isDecorative: true,
        showBlob: true
    },
    {
        id: 99,
        image: '',
        title: 'Blob Decoration',
        tags: [],
        description: 'Decorative element',
        bubbleText: '',
        size: 'large',
        gridColumn: 2,
        gridRow: 1,
        width: 1,
        height: 1,
        isDecorative: true,
        showBlob: true
    },
];

const PlusCard = ({ onClick, isDarkMode }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <Box
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: '8px',
                backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
                border: `2px dashed ${isDarkMode ? '#333' : '#ddd'}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                    backgroundColor: isDarkMode ? '#222' : '#f0f0f0',
                    borderColor: '#FF36C9',
                }
            }}
        >
            <Typography
                sx={{
                    fontSize: {
                        xs: '2.5rem',
                        sm: '3rem',
                        md: '3.5rem',
                        lg: '4rem'
                    },
                    fontWeight: 'bold',
                    color: isHovered ? '#FF36C9' : (isDarkMode ? '#666' : '#999'),
                    transition: 'all 0.3s ease',
                    animation: isHovered ? 'spin 1s linear infinite' : 'none',
                    transformOrigin: 'center center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                    },
                }}
            >
                +
            </Typography>
        </Box>
    );
};

// Composant séparé pour l'animation du blob (à utiliser DANS le Canvas)
const AnimatedBlobMesh = () => {
    const mesh = React.useRef();
    const uniforms = React.useRef({ time: { value: 0 } });

    // Maintenant useFrame est utilisé à l'intérieur du Canvas
    useFrame(({ clock }) => {
        uniforms.current.time.value = clock.getElapsedTime();
    });

    // Shader personnalisé avec la couleur FF36C9
    const vertexShader = `
        uniform float time;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            vec3 pos = position;
            float freq = 3.0;
            float amp = 0.2;
            pos += normal * sin(freq * pos.x + time) * amp;
            pos += normal * sin(freq * pos.y + time * 1.1) * amp;
            pos += normal * sin(freq * pos.z + time * 1.2) * amp;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float time;
        varying vec2 vUv;
        void main() {
            float pulse = sin(time * 2.0 + vUv.x * 10.0) * 0.05 + 0.95;
            // Couleur FF36C9 en RGB normalisé
            vec3 pink = vec3(1.0, 0.212 * pulse, 0.788 * pulse);
            gl_FragColor = vec4(pink, 1.0);
        }
    `;

    return (
        <mesh ref={mesh} scale={0.8}>
            <sphereGeometry args={[1, 128, 128]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms.current}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

// Composant pour les placeholders blob (corrigé)
const PlaceholderBlob = ({ card }) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                overflow: 'hidden',
            }}
            title={`${card.title} - ${card.tags.join(', ')}`}
        >
            <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={0.5} />
                <AnimatedBlobMesh />
            </Canvas>
        </Box>
    );
};

export default function CardGrid() {
    const [selectedTag, setSelectedTag] = React.useState('ALL');
    const allTags = ['ALL', 'Web-Development', 'GAMES', 'UI/UX'];

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 960px
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // > 1200px

    const processedCards = cardData.map(card => ({
        ...card,
        isVisible: card.isDecorative || selectedTag === 'ALL' || card.tags.includes(selectedTag)
    }));

    const visibleCards = processedCards.filter(card => card.isVisible && !card.isDecorative);

    const getGridDimensions = (card) => {
        if (isMobile) {
            return {
                gridColumn: '1 / -1',
                gridRow: 'auto',
            };
        }

        if (isTablet) {
            // Adapter les colonnes pour tablette (3 colonnes max)
            const adaptedColumn = Math.min(card.gridColumn, 3);
            const adaptedWidth = Math.min(card.width, 3 - adaptedColumn + 1);
            return {
                gridColumn: `${adaptedColumn} / span ${adaptedWidth}`,
                gridRow: `${card.gridRow} / span ${card.height}`,
            };
        }

        return {
            gridColumn: `${card.gridColumn} / span ${card.width}`,
            gridRow: `${card.gridRow} / span ${card.height}`,
        };
    };

    const getButtonStyles = (isSelected) => ({
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        border: '1px solid transparent',
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 0.5, sm: 1 },
        minWidth: 'fit-content',
        whiteSpace: 'nowrap',
    });

    const handleCustomProjectClick = () => {
        window.location.href = 'http://localhost:5173/contact';
    };

    return (
        <>
            <CustomCursor />
            <Box sx={{
                width: '100%',
                maxWidth: '100vw',
                overflow: 'hidden',
                px: { xs: 2, sm: 3, md: 4 },
            }}>
                {/* Header avec filtres responsive */}
                <Box sx={{
                    display: 'flex',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 3, md: 4 },
                    mb: { xs: 3, sm: 4, md: 5 },
                    p: 0,
                }}>
                    <Box sx={{
                        display: 'flex',
                        gap: { xs: 1, sm: 1.5 },
                        flexWrap: 'wrap',
                        width: { xs: '100%', sm: 'auto' },
                        justifyContent: { xs: 'center', sm: 'flex-start' },
                    }}>
                        {allTags.map(tag => (
                            <Box
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                sx={getButtonStyles(selectedTag === tag)}
                            >
                                <Box
                                    sx={{
                                        width: { xs: '8px', sm: '10px', md: '12px' },
                                        height: { xs: '8px', sm: '10px', md: '12px' },
                                        borderRadius: '2px',
                                        backgroundColor: '#FF36C9',
                                        opacity: selectedTag === tag ? 1 : 0.7,
                                        transition: 'opacity 0.3s ease',
                                    }}
                                />
                                <Typography
                                    component="span"
                                    sx={{
                                        fontSize: 'inherit',
                                        fontWeight: 'inherit',
                                    }}
                                >
                                    [{tag}]
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Grid responsive */}
                {isMobile ? (
                    // Layout mobile : colonnes simples
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            width: '100%',
                        }}
                    >
                        {visibleCards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                style={{
                                    width: '100%',
                                    height: '280px',
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
                                {card.isCustomProject ? (
                                    <PlusCard
                                        onClick={handleCustomProjectClick}
                                        isDarkMode={isDarkMode}
                                    />
                                ) : (
                                    <CustomCard
                                        image={card.image}
                                        title={card.title}
                                        tags={card.tags}
                                        description={card.description}
                                        bubbleText={card.bubbleText}
                                        size="large"
                                        link={card.link}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                                lg: 'repeat(4, 1fr)',
                            },
                            gridAutoRows: {
                                sm: '160px',
                                md: '180px',
                                lg: '200px',
                            },
                            gap: {
                                sm: 1.5,
                                md: 2,
                                lg: 2.5,
                            },
                            width: '100%',
                            maxWidth: '100%',
                            minHeight: {
                                sm: '800px',
                                md: '900px',
                                lg: '1000px',
                            },
                            boxSizing: 'border-box',
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
                                        delay: index * 0.1,
                                        ease: 'easeOut',
                                    }}
                                >
                                    {card.isVisible ? (
                                        card.showBlob ? (
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                                }}
                                            >
                                                <Canvas camera={{ position: [0, 0, 3] }}>
                                                    <ambientLight intensity={0.5} />
                                                    <pointLight position={[10, 10, 10]} />
                                                    <BlobShader
                                                        disableCursorChange={true}
                                                        disableClick={true}
                                                        scale={1}
                                                    />
                                                </Canvas>
                                            </Box>
                                        ) : card.isCustomProject ? (
                                            <PlusCard
                                                onClick={handleCustomProjectClick}
                                                isDarkMode={isDarkMode}
                                            />
                                        ) : (
                                            <CustomCard
                                                image={card.image}
                                                title={card.title}
                                                tags={card.tags}
                                                description={card.description}
                                                bubbleText={card.bubbleText}
                                                size={card.size || "large"}
                                                link={card.link}
                                            />
                                        )
                                    ) : (
                                        // Remplacement des rectangles par des blobs
                                        <PlaceholderBlob card={card} />
                                    )}
                                </motion.div>
                            ))}
                    </Box>
                )}
            </Box>
        </>
    );
}