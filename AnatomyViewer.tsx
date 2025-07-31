import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, Loader } from '@react-three/drei';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '../stores/studyStore';
import { useAnatomyData } from '../hooks/useAnatomyData';

// 3D Model Components
import BrainModel from '../components/3D/BrainModel';
import HeartModel from '../components/3D/HeartModel';
import LungsModel from '../components/3D/LungsModel';
import SkeletonModel from '../components/3D/SkeletonModel';
import MuscularModel from '../components/3D/MuscularModel';

// UI Components
import ModelControls from '../components/Anatomy/ModelControls';
import InfoPanel from '../components/Anatomy/InfoPanel';
import AnnotationPanel from '../components/Anatomy/AnnotationPanel';
import SystemSelector from '../components/Anatomy/SystemSelector';
import LayerControls from '../components/Anatomy/LayerControls';
import CrossSectionControls from '../components/Anatomy/CrossSectionControls';

// Types
import { AnatomySystem, ModelLayer, AnnotationPoint } from '../types/anatomy';

const modelComponents = {
  brain: BrainModel,
  heart: HeartModel,
  lungs: LungsModel,
  skeleton: SkeletonModel,
  muscular: MuscularModel,
};

const AnatomyViewer: React.FC = () => {
  const { system = 'brain' } = useParams<{ system: AnatomySystem }>();
  const navigate = useNavigate();
  const { addViewedModel, saveAnnotation } = useStudyStore();
  const { data: anatomyData, isLoading } = useAnatomyData(system);

  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [activeLayers, setActiveLayers] = useState<ModelLayer[]>([]);
  const [showLabels, setShowLabels] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const [crossSectionMode, setCrossSectionMode] = useState(false);
  const [annotations, setAnnotations] = useState<AnnotationPoint[]>([]);
  const [viewMode, setViewMode] = useState<'3d' | 'xray' | 'mri'>('3d');

  const ModelComponent = modelComponents[system as keyof typeof modelComponents] || BrainModel;

  useEffect(() => {
    addViewedModel(system);
  }, [system, addViewedModel]);

  const handlePartSelect = (partId: string) => {
    setSelectedPart(partId);
  };

  const handleAnnotationAdd = (point: AnnotationPoint) => {
    const newAnnotation = {
      ...point,
      id: `ann-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setAnnotations([...annotations, newAnnotation]);
    saveAnnotation(system, newAnnotation);
  };

  const handleLayerToggle = (layer: ModelLayer) => {
    setActiveLayers(prev =>
      prev.includes(layer)
        ? prev.filter(l => l !== layer)
        : [...prev, layer]
    );
  };

  const handleSystemChange = (newSystem: AnatomySystem) => {
    navigate(`/anatomy/${newSystem}`);
  };

  return (
    <div className="anatomy-viewer">
      <div className="viewer-container">
        {/* 3D Canvas */}
        <Canvas
          className="anatomy-canvas"
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={<Html center><Loader /></Html>}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            
            <ModelComponent
              onPartSelect={handlePartSelect}
              selectedPart={selectedPart}
              activeLayers={activeLayers}
              showLabels={showLabels}
              crossSectionMode={crossSectionMode}
              viewMode={viewMode}
              annotations={annotations}
            />
            
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={isRotating}
              autoRotateSpeed={1}
            />
            
            <Environment preset="studio" />
          </Suspense>
        </Canvas>

        {/* System Selector */}
        <SystemSelector
          currentSystem={system}
          onSystemChange={handleSystemChange}
        />

        {/* Model Controls */}
        <ModelControls
          isRotating={isRotating}
          onRotationToggle={() => setIsRotating(!isRotating)}
          showLabels={showLabels}
          onLabelsToggle={() => setShowLabels(!showLabels)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onResetView={() => {
            // Reset camera position
          }}
        />

        {/* Layer Controls */}
        <LayerControls
          system={system}
          activeLayers={activeLayers}
          onLayerToggle={handleLayerToggle}
        />

        {/* Cross Section Controls */}
        {crossSectionMode && (
          <CrossSectionControls
            onClose={() => setCrossSectionMode(false)}
            onPlaneChange={(plane) => {
              // Handle plane change
            }}
          />
        )}

        {/* Info Panel */}
        <AnimatePresence>
          {selectedPart && anatomyData && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <InfoPanel
                partId={selectedPart}
                anatomyData={anatomyData}
                onClose={() => setSelectedPart(null)}
                onAnnotate={(text) => {
                  handleAnnotationAdd({
                    partId: selectedPart,
                    text,
                    position: [0, 0, 0], // Would be actual 3D position
                  });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Annotations Panel */}
        {annotations.length > 0 && (
          <AnnotationPanel
            annotations={annotations}
            onAnnotationSelect={(id) => {
              const annotation = annotations.find(a => a.id === id);
              if (annotation) {
                setSelectedPart(annotation.partId);
              }
            }}
            onAnnotationDelete={(id) => {
              setAnnotations(annotations.filter(a => a.id !== id));
            }}
          />
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
          <p>Loading anatomy data...</p>
        </div>
      )}
    </div>
  );
};

export default AnatomyViewer;
