import React, { useState, useEffect } from 'react';

// Brain Model Component
const BrainModel: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      perspective: '1000px',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        transform: `rotateY(${rotation}deg)`,
        transformStyle: 'preserve-3d',
        position: 'relative',
        width: '300px',
        height: '300px',
        transition: 'transform 0.1s ease-out'
      }}>
        {/* Main brain structure */}
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ff6b6b, #ff4757)',
          boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
          transform: 'translateZ(0px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Brain
        </div>
        
        {/* Left hemisphere */}
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ff8e8e, #ff6b6b)',
          left: '-60px',
          top: '40px',
          transform: 'translateZ(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          Left
        </div>
        
        {/* Right hemisphere */}
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ff8e8e, #ff6b6b)',
          right: '-60px',
          top: '40px',
          transform: 'translateZ(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          Right
        </div>
        
        {/* Brain stem */}
        <div style={{
          position: 'absolute',
          width: '40px',
          height: '80px',
          background: 'linear-gradient(to bottom, #ff4757, #ff3742)',
          borderRadius: '20px',
          bottom: '-40px',
          left: '50%',
          transform: 'translateX(-50%) translateZ(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold'
        }}>
          Stem
        </div>
      </div>
    </div>
  );
};

// Heart Model Component
const HeartModel: React.FC = () => {
  const [beat, setBeat] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setBeat(prev => prev === 1 ? 1.1 : 1);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      perspective: '1000px',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        transform: `scale(${beat})`,
        transformStyle: 'preserve-3d',
        position: 'relative',
        width: '300px',
        height: '300px',
        transition: 'transform 0.2s ease-in-out'
      }}>
        {/* Main heart chambers */}
        <div style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ff4757, #ff3742)',
          boxShadow: '0 10px 30px rgba(255, 71, 87, 0.3)',
          transform: 'translateZ(0px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Heart
        </div>
        
        {/* Left atrium */}
        <div style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ff6b6b, #ff4757)',
          left: '-40px',
          top: '20px',
          transform: 'translateZ(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold'
        }}>
          LA
        </div>
        
        {/* Right atrium */}
        <div style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ff6b6b, #ff4757)',
          right: '-40px',
          top: '20px',
          transform: 'translateZ(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold'
        }}>
          RA
        </div>
        
        {/* Left ventricle */}
        <div style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ff3742, #ff1e3a)',
          left: '-30px',
          bottom: '20px',
          transform: 'translateZ(15px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold'
        }}>
          LV
        </div>
        
        {/* Right ventricle */}
        <div style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ff3742, #ff1e3a)',
          right: '-30px',
          bottom: '20px',
          transform: 'translateZ(15px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold'
        }}>
          RV
        </div>
        
        {/* Aorta */}
        <div style={{
          position: 'absolute',
          width: '40px',
          height: '60px',
          background: 'linear-gradient(to bottom, #ff6b6b, #ff4757)',
          borderRadius: '20px',
          bottom: '-30px',
          left: '50%',
          transform: 'translateX(-50%) translateZ(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold'
        }}>
          Aorta
        </div>
      </div>
    </div>
  );
};

// Skeleton Model Component
const SkeletonModel: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      perspective: '1000px',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        transform: `rotateY(${rotation}deg)`,
        transformStyle: 'preserve-3d',
        position: 'relative',
        width: '300px',
        height: '400px',
        transition: 'transform 0.1s ease-out'
      }}>
        {/* Skull */}
        <div style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #f1f2f6, #e9ecef)',
          boxShadow: '0 5px 15px rgba(241, 242, 246, 0.3)',
          top: '0px',
          left: '50%',
          transform: 'translateX(-50%) translateZ(0px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#495057',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          Skull
        </div>
        
        {/* Spine */}
        <div style={{
          position: 'absolute',
          width: '20px',
          height: '200px',
          background: 'linear-gradient(to bottom, #f1f2f6, #e9ecef)',
          borderRadius: '10px',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%) translateZ(0px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#495057',
          fontSize: '10px',
          fontWeight: 'bold'
        }}>
          Spine
        </div>
        
        {/* Ribs */}
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '120px',
            height: '4px',
            background: 'linear-gradient(to right, #f1f2f6, #e9ecef)',
            borderRadius: '2px',
            top: `${100 + i * 20}px`,
            left: '50%',
            transform: `translateX(-50%) translateZ(${10 + i * 2}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#495057',
            fontSize: '8px',
            fontWeight: 'bold'
          }}>
            Rib {i + 1}
          </div>
        ))}
        
        {/* Arms */}
        <div style={{
          position: 'absolute',
          width: '15px',
          height: '100px',
          background: 'linear-gradient(to bottom, #f1f2f6, #e9ecef)',
          borderRadius: '7.5px',
          top: '120px',
          left: '60px',
          transform: 'translateZ(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#495057',
          fontSize: '8px',
          fontWeight: 'bold'
        }}>
          Arm
        </div>
        
        <div style={{
          position: 'absolute',
          width: '15px',
          height: '100px',
          background: 'linear-gradient(to bottom, #f1f2f6, #e9ecef)',
          borderRadius: '7.5px',
          top: '120px',
          right: '60px',
          transform: 'translateZ(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#495057',
          fontSize: '8px',
          fontWeight: 'bold'
        }}>
          Arm
        </div>
        
        {/* Legs */}
        <div style={{
          position: 'absolute',
          width: '20px',
          height: '150px',
          background: 'linear-gradient(to bottom, #f1f2f6, #e9ecef)',
          borderRadius: '10px',
          top: '280px',
          left: '40%',
          transform: 'translateZ(0px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#495057',
          fontSize: '8px',
          fontWeight: 'bold'
        }}>
          Leg
        </div>
        
        <div style={{
          position: 'absolute',
          width: '20px',
          height: '150px',
          background: 'linear-gradient(to bottom, #f1f2f6, #e9ecef)',
          borderRadius: '10px',
          top: '280px',
          right: '40%',
          transform: 'translateZ(0px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#495057',
          fontSize: '8px',
          fontWeight: 'bold'
        }}>
          Leg
        </div>
        
        {/* Pelvis */}
        <div style={{
          position: 'absolute',
          width: '100px',
          height: '20px',
          background: 'linear-gradient(to right, #f1f2f6, #e9ecef)',
          borderRadius: '10px',
          top: '260px',
          left: '50%',
          transform: 'translateX(-50%) translateZ(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#495057',
          fontSize: '10px',
          fontWeight: 'bold'
        }}>
          Pelvis
        </div>
      </div>
    </div>
  );
};

// Main Anatomy Viewer Component
const AnatomyViewer: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<'brain' | 'heart' | 'skeleton'>('brain');
  const [isAnimating, setIsAnimating] = useState(true);

  const models = {
    brain: { name: 'Brain', component: BrainModel, color: '#ff6b6b', description: 'Interactive 3D brain model with hemispheres and brain stem' },
    heart: { name: 'Heart', component: HeartModel, color: '#ff4757', description: 'Beating heart model with all four chambers and aorta' },
    skeleton: { name: 'Skeleton', component: SkeletonModel, color: '#f1f2f6', description: 'Complete skeletal system with bones and joints' }
  };

  const SelectedModelComponent = models[selectedModel].component;

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
          3D Anatomy Viewer
        </h1>
        <p style={{ color: '#a0a0a0', margin: 0 }}>
          Interactive 3D models for medical education
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
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {Object.entries(models).map(([key, model]) => (
            <button
              key={key}
              onClick={() => setSelectedModel(key as any)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: selectedModel === key ? model.color : 'rgba(255,255,255,0.1)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              {model.name}
            </button>
          ))}
        </div>

        {/* Animation Toggle */}
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: isAnimating ? '#10b981' : 'rgba(255,255,255,0.1)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          {isAnimating ? '⏸️ Pause Animation' : '▶️ Start Animation'}
        </button>

        {/* Instructions */}
        <div style={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
          💡 Watch the 3D models rotate and animate automatically
        </div>
      </div>

      {/* 3D Model Display */}
      <div style={{ 
        flex: 1, 
        position: 'relative',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {isAnimating ? (
          <SelectedModelComponent />
        ) : (
          <div style={{
            color: 'white',
            fontSize: '1.2rem',
            textAlign: 'center',
            padding: '2rem'
          }}>
            Animation paused. Click "Start Animation" to resume.
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div style={{
        padding: '1rem 2rem',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
          <strong style={{ color: 'white' }}>Current Model:</strong> {models[selectedModel].name}
          <br />
          <strong style={{ color: 'white' }}>Description:</strong> {models[selectedModel].description}
          <br />
          <strong style={{ color: 'white' }}>Features:</strong> CSS 3D transforms, smooth animations, realistic lighting effects
        </div>
      </div>
    </div>
  );
};

export default AnatomyViewer;
