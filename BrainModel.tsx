import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ModelLayer, ViewMode, AnnotationPoint } from '../../types/anatomy';

interface BrainModelProps {
  onPartSelect: (partId: string) => void;
  selectedPart: string | null;
  activeLayers: ModelLayer[];
  showLabels: boolean;
  crossSectionMode: boolean;
  viewMode: ViewMode;
  annotations: AnnotationPoint[];
}

interface BrainPart {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  layer: ModelLayer;
  description: string;
}

const brainParts: BrainPart[] = [
  {
    id: 'frontal-lobe',
    name: 'Frontal Lobe',
    position: [0.8, 0.5, 1],
    color: '#ff6b6b',
    layer: 'surface',
    description: 'Responsible for executive functions, motor control, and speech production.',
  },
  {
    id: 'parietal-lobe',
    name: 'Parietal Lobe',
    position: [0, 1, 0],
    color: '#4ecdc4',
    layer: 'surface',
    description: 'Processes sensory information and spatial awareness.',
  },
  {
    id: 'temporal-lobe',
    name: 'Temporal Lobe',
    position: [1.2, -0.3, 0],
    color: '#45b7d1',
    layer: 'surface',
    description: 'Involved in auditory processing and memory formation.',
  },
  {
    id: 'occipital-lobe',
    name: 'Occipital Lobe',
    position: [-0.8, 0, -0.8],
    color: '#96ceb4',
    layer: 'surface',
    description: 'Primary visual processing center of the brain.',
  },
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    position: [0, -1, -0.8],
    color: '#dfe6e9',
    layer: 'deep',
    description: 'Coordinates voluntary movements and balance.',
  },
  {
    id: 'brain-stem',
    name: 'Brain Stem',
    position: [0, -1.5, 0],
    color: '#fab1a0',
    layer: 'deep',
    description: 'Controls vital functions like breathing and heart rate.',
  },
  {
    id: 'hippocampus',
    name: 'Hippocampus',
    position: [0.5, -0.5, 0],
    color: '#e17055',
    layer: 'internal',
    description: 'Critical for memory formation and spatial navigation.',
  },
  {
    id: 'amygdala',
    name: 'Amygdala',
    position: [0.7, -0.6, 0.3],
    color: '#fdcb6e',
    layer: 'internal',
    description: 'Processes emotions and fear responses.',
  },
];

const BrainModel: React.FC<BrainModelProps> = ({
  onPartSelect,
  selectedPart,
  activeLayers,
  showLabels,
  crossSectionMode,
  viewMode,
  annotations,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [loadedModel, setLoadedModel] = useState<THREE.Object3D | null>(null);

  // Load 3D model (in production, would load actual GLTF model)
  useEffect(() => {
    // Simulated model loading
    // In production: const gltf = useLoader(GLTFLoader, '/models/brain.glb');
    // For demo, we'll create procedural geometry
  }, []);

  // Animation
  useFrame((state) => {
    if (groupRef.current && !crossSectionMode) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const handlePartClick = (part: BrainPart) => {
    onPartSelect(part.id);
  };

  const handlePointerOver = (part: BrainPart) => {
    setHoveredPart(part.id);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHoveredPart(null);
    document.body.style.cursor = 'default';
  };

  const isPartVisible = (part: BrainPart) => {
    if (activeLayers.length === 0) return true;
    return activeLayers.includes(part.layer);
  };

  const getPartMaterial = (part: BrainPart) => {
    const isSelected = selectedPart === part.id;
    const isHovered = hoveredPart === part.id;

    if (viewMode === 'xray') {
      return new THREE.MeshBasicMaterial({
        color: part.color,
        transparent: true,
        opacity: isSelected ? 0.8 : 0.3,
        wireframe: true,
      });
    }

    if (viewMode === 'mri') {
      return new THREE.MeshLambertMaterial({
        color: '#ffffff',
        emissive: part.color,
        emissiveIntensity: isSelected ? 0.8 : 0.3,
      });
    }

    return new THREE.MeshPhongMaterial({
      color: part.color,
      emissive: isSelected || isHovered ? part.color : '#000000',
      emissiveIntensity: isSelected ? 0.3 : isHovered ? 0.1 : 0,
      shininess: 100,
      transparent: crossSectionMode,
      opacity: crossSectionMode ? 0.8 : 1,
    });
  };

  return (
    <group ref={groupRef}>
      {/* Main brain structure */}
      <group>
        {brainParts.map((part) => {
          if (!isPartVisible(part)) return null;

          const geometry = part.id === 'brain-stem'
            ? new THREE.CylinderGeometry(0.3, 0.4, 1.5, 16)
            : new THREE.SphereGeometry(
                part.id === 'cerebellum' ? 0.8 : 
                part.layer === 'internal' ? 0.3 : 0.6,
                32,
                32
              );

          return (
            <mesh
              key={part.id}
              position={part.position}
              geometry={geometry}
              material={getPartMaterial(part)}
              onClick={() => handlePartClick(part)}
              onPointerOver={() => handlePointerOver(part)}
              onPointerOut={handlePointerOut}
            >
              {showLabels && (
                <Html
                  position={[0, 0.5, 0]}
                  center
                  style={{
                    transition: 'all 0.2s',
                    opacity: hoveredPart === part.id || selectedPart === part.id ? 1 : 0.7,
                    fontSize: hoveredPart === part.id ? '14px' : '12px',
                  }}
                >
                  <div className="anatomy-label">
                    <span className="label-text">{part.name}</span>
                  </div>
                </Html>
              )}
            </mesh>
          );
        })}
      </group>

      {/* Main brain body (simplified representation) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          color="#ffb6c1"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Surface details for realism */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={`detail-${i}`}
          position={[
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2.5,
          ]}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshPhongMaterial color="#ff9999" />
        </mesh>
      ))}

      {/* Annotations */}
      {annotations.map((annotation) => {
        const part = brainParts.find(p => p.id === annotation.partId);
        if (!part) return null;

        return (
          <Html
            key={annotation.id}
            position={part.position}
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              maxWidth: '200px',
            }}
          >
            <div>{annotation.text}</div>
          </Html>
        );
      })}

      {/* Cross-section plane */}
      {crossSectionMode && (
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
          <planeGeometry args={[5, 5]} />
          <meshBasicMaterial
            color="#2563eb"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

export default BrainModel;
