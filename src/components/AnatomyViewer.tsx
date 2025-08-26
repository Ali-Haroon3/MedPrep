import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Environment, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// Brain Model Component
const BrainModel: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Main brain hemispheres */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Left hemisphere */}
      <mesh position={[-1.2, 0, 0]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial color="#ff8e8e" roughness={0.4} metalness={0.1} />
      </mesh>
      
      {/* Right hemisphere */}
      <mesh position={[1.2, 0, 0]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial color="#ff8e8e" roughness={0.4} metalness={0.1} />
      </mesh>
      
      {/* Brain stem */}
      <mesh position={[0, -2.5, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 1.5, 16]} />
        <meshStandardMaterial color="#ff4757" roughness={0.5} metalness={0.1} />
      </mesh>
      
      {/* Cerebellum */}
      <mesh position={[0, -1.5, -1]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Labels */}
      <Html position={[-2.5, 1, 0]} center>
        <div style={{
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          whiteSpace: 'nowrap'
        }}>
          Left Hemisphere
        </div>
      </Html>
      
      <Html position={[2.5, 1, 0]} center>
        <div style={{
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          whiteSpace: 'nowrap'
        }}>
          Right Hemisphere
        </div>
      </Html>
    </group>
  );
};

// Heart Model Component
const HeartModel: React.FC = () => {
  const heartRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (heartRef.current) {
      // Simulate heartbeat
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      heartRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={heartRef}>
      {/* Main heart chambers */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#ff4757" roughness={0.2} metalness={0.3} />
      </mesh>
      
      {/* Left atrium */}
      <mesh position={[-1.2, 0.5, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Right atrium */}
      <mesh position={[1.2, 0.5, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Left ventricle */}
      <mesh position={[-0.8, -1, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ff3742" roughness={0.2} metalness={0.3} />
      </mesh>
      
      {/* Right ventricle */}
      <mesh position={[0.8, -1, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ff3742" roughness={0.2} metalness={0.3} />
      </mesh>
      
      {/* Aorta */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1.5, 16]} />
        <meshStandardMaterial color="#ff4757" roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Labels */}
      <Html position={[-2, 0.5, 0]} center>
        <div style={{
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          whiteSpace: 'nowrap'
        }}>
          Left Atrium
        </div>
      </Html>
      
      <Html position={[2, 0.5, 0]} center>
        <div style={{
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          whiteSpace: 'nowrap'
        }}>
          Right Atrium
        </div>
      </Html>
    </group>
  );
};

// Skeleton Model Component
const SkeletonModel: React.FC = () => {
  const skeletonRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (skeletonRef.current) {
      skeletonRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={skeletonRef}>
      {/* Skull */}
      <mesh position={[0, 3, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#f1f2f6" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Spine */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4, 8]} />
        <meshStandardMaterial color="#f1f2f6" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Ribs */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[0, 1.5 - i * 0.5, 0]}>
          <torusGeometry args={[1.2, 0.1, 8, 16]} />
          <meshStandardMaterial color="#f1f2f6" roughness={0.7} metalness={0.1} />
        </mesh>
      ))}
      
      {/* Arms */}
      <mesh position={[-1.5, 1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
        <meshStandardMaterial color="#f1f2f6" roughness={0.7} metalness={0.1} />
      </mesh>
      
      <mesh position={[1.5, 1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
        <meshStandardMaterial color="#f1f2f6" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.5, -2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 3, 8]} />
        <meshStandardMaterial color="#f1f2f6" roughness={0.7} metalness={0.1} />
      </mesh>
      
      <mesh position={[0.5, -2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 3, 8]} />
        <meshStandardMaterial color="#f1f2f6" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Pelvis */}
      <mesh position={[0, -1, 0]}>
        <torusGeometry args={[0.8, 0.2, 8, 16]} />
        <meshStandardMaterial color="#f1f2f6" roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  );
};

// Muscles Model Component
const MusclesModel: React.FC = () => {
  const musclesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (musclesRef.current) {
      musclesRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={musclesRef}>
      {/* Torso muscles */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 3, 16]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.4} metalness={0.1} />
      </mesh>
      
      {/* Pectoral muscles */}
      <mesh position={[0, 0.5, 0.8]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ff8e8e" roughness={0.5} metalness={0.1} />
      </mesh>
      
      {/* Abdominal muscles */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={i} position={[0, -0.5 - i * 0.3, 0.8]}>
          <boxGeometry args={[1.5, 0.2, 0.3]} />
          <meshStandardMaterial color="#ff6b6b" roughness={0.4} metalness={0.1} />
        </mesh>
      ))}
      
      {/* Arm muscles */}
      <mesh position={[-1.5, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 2, 12]} />
        <meshStandardMaterial color="#ff8e8e" roughness={0.4} metalness={0.1} />
      </mesh>
      
      <mesh position={[1.5, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 2, 12]} />
        <meshStandardMaterial color="#ff8e8e" roughness={0.4} metalness={0.1} />
      </mesh>
      
      {/* Leg muscles */}
      <mesh position={[-0.5, -2, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 3, 12]} />
        <meshStandardMaterial color="#ff8e8e" roughness={0.4} metalness={0.1} />
      </mesh>
      
      <mesh position={[0.5, -2, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 3, 12]} />
        <meshStandardMaterial color="#ff8e8e" roughness={0.4} metalness={0.1} />
      </mesh>
    </group>
  );
};

// Organs Model Component
const OrgansModel: React.FC = () => {
  const organsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (organsRef.current) {
      organsRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={organsRef}>
      {/* Liver */}
      <mesh position={[1, 0, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#ffa502" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Stomach */}
      <mesh position={[-0.5, 0.5, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#ff6348" roughness={0.4} metalness={0.1} />
      </mesh>
      
      {/* Lungs */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#ff7675" roughness={0.3} metalness={0.1} />
      </mesh>
      
      <mesh position={[0, -1, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#ff7675" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Kidneys */}
      <mesh position={[-1, -0.5, 0]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.4} metalness={0.1} />
      </mesh>
      
      <mesh position={[1, -0.5, 0]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.4} metalness={0.1} />
      </mesh>
      
      {/* Intestines */}
      <mesh position={[0, -1.5, 0]}>
        <torusGeometry args={[0.8, 0.2, 8, 16]} />
        <meshStandardMaterial color="#ffa502" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
};

// Main Anatomy Viewer Component
const AnatomyViewer: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<'brain' | 'heart' | 'skeleton' | 'muscles' | 'organs'>('brain');

  const models = {
    brain: { 
      name: 'Brain & Nervous System', 
      description: 'Detailed 3D brain model with hemispheres, brain stem, and cerebellum',
      icon: '🧠',
      component: BrainModel
    },
    heart: { 
      name: 'Cardiovascular System', 
      description: 'Interactive 3D heart with chambers, atria, ventricles, and aorta',
      icon: '❤️',
      component: HeartModel
    },
    skeleton: { 
      name: 'Skeletal System', 
      description: 'Complete 3D skeleton with skull, spine, ribs, arms, and legs',
      icon: '🦴',
      component: SkeletonModel
    },
    muscles: {
      name: 'Muscular System',
      description: '3D muscle model showing major muscle groups and anatomy',
      icon: '💪',
      component: MusclesModel
    },
    organs: {
      name: 'Internal Organs',
      description: '3D organ model with liver, stomach, lungs, kidneys, and intestines',
      icon: '🫀',
      component: OrgansModel
    }
  };

  const selectedModelData = models[selectedModel];
  const ModelComponent = selectedModelData.component;

  return (
    <div style={{ 
      height: '100vh', 
      backgroundColor: '#0f0f23',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem 2rem',
        backgroundColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'white',
          margin: 0,
          marginBottom: '0.5rem'
        }}>
          3D Anatomy Models
        </h1>
        <p style={{ color: '#a0a0a0', margin: 0 }}>
          Interactive 3D models built directly in MedPrep
        </p>
      </div>

      {/* Controls */}
      <div style={{
        padding: '1rem 2rem',
        backgroundColor: 'rgba(255,255,255,0.05)',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Model Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {Object.entries(models).map(([key, model]) => (
            <button
              key={key}
              onClick={() => setSelectedModel(key as any)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: selectedModel === key ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{model.icon}</span>
              {model.name}
            </button>
          ))}
        </div>

        {/* Instructions */}
        <div style={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
          💡 Drag to rotate, scroll to zoom, right-click to pan
        </div>
      </div>

      {/* 3D Model Display */}
      <div style={{ 
        flex: 1, 
        position: 'relative',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)'
      }}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, 0.75]}
          >
            <ModelComponent />
          </PresentationControls>
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={15}
          />
          
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Info Panel */}
      <div style={{
        padding: '1rem 2rem',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
          <strong style={{ color: 'white' }}>Current Model:</strong> {selectedModelData.name}
          <br />
          <strong style={{ color: 'white' }}>Description:</strong> {selectedModelData.description}
          <br />
          <strong style={{ color: 'white' }}>Features:</strong> Interactive 3D visualization, real-time animations, detailed anatomy, professional medical modeling
          <br />
          <strong style={{ color: 'white' }}>Controls:</strong> Mouse drag to rotate, scroll wheel to zoom, right-click and drag to pan
        </div>
      </div>
    </div>
  );
};

export default AnatomyViewer;
