'use client'

import { Html, useProgress } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import plane from './assets/plane.glb';
  

export function Plane() {
    const gltf = useLoader(GLTFLoader, plane);
    // actions are the animation objects and names of the animations. you need to access both to play animations
    const { actions, names } = useAnimations(gltf.animations, gltf.scene);
    console.log("actions", actions, "names", names)
    const meshRef = useRef<THREE.Object3D>(null); // reference for the mesh
    const [position, setPosition] = useState([0, 0.5, 0.3]); // Initial position of the plane
  
    useEffect(() => {
      if (actions && names.length) {
        const action = actions[names[0]];
        action?.play();
        // Slow down the animation by setting timeScale to a value less than 1
        if (action) { // Check if action is not null
          action.timeScale = 0.5; // Adjust this value to control speed (0.5 = 50% speed)
        }
      }
    }, [actions, names]);

    return (
      <primitive
      ref={meshRef}
      object={gltf.scene}
      position={position}
      scale={[0.005, 0.005, 0.005]}
      castShadow
  
      />
    );
  
}

export default function Model() {
    return (
        <Canvas camera={{ position: [-0.5, 1, 3] }} shadows>
            <directionalLight
              position={[-1.3, 6.0, 4.4]}
              castShadow
              intensity={Math.PI * 1}
            />
              <Plane />
        </Canvas>
      );    
}