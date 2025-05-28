// components/BlobShader.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float time;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float freq = 3.0;
    float amp = 0.2;
    // Déformation basée sur la sinusoïde du temps et de la position
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
    // Couleur dégradée animée plus sophistiquée
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    // Couleurs qui changent avec le temps
    vec3 color1 = vec3(0.2, 0.6, 1.0); // Bleu
    vec3 color2 = vec3(1.0, 0.4, 0.8); // Rose
    vec3 color3 = vec3(0.3, 1.0, 0.5); // Vert
    // Mélange des couleurs basé sur la position et le temps
    float t1 = sin(time * 0.5 + dist * 10.0) * 0.5 + 0.5;
    float t2 = cos(time * 0.7 + vUv.x * 5.0) * 0.5 + 0.5;
    vec3 finalColor = mix(mix(color1, color2, t1), color3, t2);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const BlobShader = ({ disableClick = false, scale = 1.5 }) => {
  const mesh = useRef();
  const uniforms = useRef({
    time: { value: 0 }
  });

  useFrame(({ clock }) => {
    uniforms.current.time.value = clock.getElapsedTime();
  });

  const handleClick = (e) => {
    if (disableClick) {
      e.stopPropagation();
      return;
    }
    // Vous pouvez modifier cette action selon vos besoins
    window.open('/assets/cv.pdf', '_blank');
  };

  const handlePointerOver = (e) => {
    if (disableClick) return;
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    if (disableClick) return;
    e.stopPropagation();
    document.body.style.cursor = 'auto';
  };

  return (
    <mesh
      ref={mesh}
      scale={scale}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
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

export default BlobShader;