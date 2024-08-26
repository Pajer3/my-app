"use client";
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from 'three';

interface ModelProps {
  scale: number;
}

interface CameraControlsProps {
  cameraDistance: number;
}

function Model({ scale }: ModelProps) {
  const { scene } = useGLTF("/models/Mercuryspacesuitflownglove.glb");
  const modelRef = useRef<THREE.Object3D>();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={scale} position={[0, -1.5, 0]} />;
}

function CameraControls({ cameraDistance }: CameraControlsProps) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, cameraDistance);
    camera.lookAt(0, -1.5, 0);
  }, [camera, cameraDistance]);

  useFrame(() => {
    camera.updateProjectionMatrix();
  });

  return null;
}

export default function Hero() {
  const [scale, setScale] = useState(3.5);
  const [cameraDistance, setCameraDistance] = useState(0.8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale(2.5);
        setCameraDistance(1.5);
      } else {
        setScale(3.5);
        setCameraDistance(0.8);
      }
    };

    handleResize(); // Set the initial values
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="hero" className="relative h-screen md:h-screen w-full bg-gradient-to-b from-blue-900 via-purple-900 to-gray-900">
      <div className="container mx-auto h-full md:h-full flex flex-col items-center justify-center md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-1/2 h-2/3 md:h-full flex items-center justify-center">
          <Canvas className="w-full h-full">
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
            <Model scale={scale} />
            <CameraControls cameraDistance={cameraDistance} />
            <OrbitControls 
              enableZoom={false} 
              minPolarAngle={Math.PI / 2} 
              maxPolarAngle={Math.PI / 2} 
              target={[0, -1.5, 0]} 
            />
          </Canvas>
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-8 text-white md:relative md:w-1/2 md:h-full md:z-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to Warm Handwear
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 drop-shadow-lg">
            Your go-to destination for premium handwear.
          </p>
          <a
            href="#showcase"
            className="px-6 py-2 sm:px-8 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-base sm:text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
