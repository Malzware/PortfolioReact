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
    vec3 pink = vec3(1.0, 0.2117 * pulse, 0.788 * pulse);
    gl_FragColor = vec4(pink, 1.0);
  }
`;

const BlobShader = ({ onClick, disableClick = false, disableCursorChange = false, scale = 1.5 }) => {
  const mesh = useRef();
  const uniforms = useRef({ time: { value: 0 } });

  useFrame(({ clock }) => {
    uniforms.current.time.value = clock.getElapsedTime();
  });

  const handleClick = (e) => {
    if (disableClick) {
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  const handlePointerOver = (e) => {
    if (disableClick || disableCursorChange) return;
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    if (disableClick || disableCursorChange) return;
    e.stopPropagation();
    document.body.style.cursor = 'auto';
  };

  return (
    <mesh
      ref={mesh}
      scale={scale}
      onClick={disableClick ? null : handleClick}
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