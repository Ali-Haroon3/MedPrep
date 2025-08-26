import React, { useState } from 'react';

// Main Anatomy Viewer Component
const AnatomyViewer: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<'body' | 'brain' | 'heart' | 'skeleton' | 'muscles' | 'organs'>('body');

  const models = {
    body: { 
      name: 'Complete Human Body', 
      url: 'https://www.visiblebody.com/web/viewer.html',
      description: 'Interactive 3D human body with detailed anatomy from Visible Body',
      icon: '🧬',
      embeddable: true
    },
    brain: { 
      name: 'Brain & Nervous System', 
      url: 'https://www.zygotebody.com/',
      description: 'Detailed brain anatomy with nervous system visualization from Zygote Body',
      icon: '🧠',
      embeddable: true
    },
    heart: { 
      name: 'Cardiovascular System', 
      url: 'https://www.innerbody.com/interactive-body.html',
      description: 'Complete cardiovascular system with heart chambers and blood vessels',
      icon: '❤️',
      embeddable: true
    },
    skeleton: { 
      name: 'Skeletal System', 
      url: 'https://www.getbodysmart.com/skeletal-system',
      description: 'Full skeletal system with bone details and joint structures',
      icon: '🦴',
      embeddable: false
    },
    muscles: {
      name: 'Muscular System',
      url: 'https://www.kenhub.com/en/library/anatomy/muscles',
      description: 'Complete muscular system with muscle origins, insertions, and actions',
      icon: '💪',
      embeddable: false
    },
    organs: {
      name: 'Internal Organs',
      url: 'https://teachmeanatomy.info/',
      description: 'Detailed internal organ anatomy with cross-sections and medical information',
      icon: '🫀',
      embeddable: false
    }
  };

  const selectedModelData = models[selectedModel];

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
          Embedded 3D Anatomy Viewer
        </h1>
        <p style={{ color: '#a0a0a0', margin: 0 }}>
          Interactive 3D models embedded directly in MedPrep
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
              {model.embeddable && <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>✓</span>}
            </button>
          ))}
        </div>

        {/* Instructions */}
        <div style={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
          {selectedModelData.embeddable 
            ? '💡 3D viewer embedded directly in MedPrep' 
            : '💡 Click to open external 3D anatomy viewer'
          }
        </div>
      </div>

      {/* 3D Model Display */}
      <div style={{ 
        flex: 1, 
        position: 'relative',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)'
      }}>
        {selectedModelData.embeddable ? (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '2rem'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              maxWidth: '1200px',
              maxHeight: '600px',
              border: '2px solid rgba(255,255,255,0.1)',
              borderRadius: '0.5rem',
              overflow: 'hidden'
            }}>
              <iframe
                src={selectedModelData.url}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                title={`3D ${selectedModelData.name} Viewer`}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              />
            </div>
            <div style={{
              marginTop: '1rem',
              color: '#a0a0a0',
              fontSize: '0.875rem',
              textAlign: 'center'
            }}>
              Loading professional 3D anatomy viewer...
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '2rem'
          }}>
            <div style={{
              textAlign: 'center',
              color: 'white',
              maxWidth: '600px'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem'
              }}>
                {selectedModelData.icon}
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                {selectedModelData.name}
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#a0a0a0',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                {selectedModelData.description}
              </p>
              <button
                onClick={() => window.open(selectedModelData.url, '_blank')}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                🚀 Open External 3D Viewer
              </button>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginTop: '1rem'
              }}>
                Opens in a new tab with full interactive controls
              </p>
            </div>
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
          <strong style={{ color: 'white' }}>Current Model:</strong> {selectedModelData.name}
          <br />
          <strong style={{ color: 'white' }}>Description:</strong> {selectedModelData.description}
          <br />
          <strong style={{ color: 'white' }}>Status:</strong> {selectedModelData.embeddable ? 'Embedded in MedPrep' : 'External link'}
          <br />
          <strong style={{ color: 'white' }}>Features:</strong> Professional 3D visualization, interactive controls, detailed labels, medical-grade accuracy
        </div>
      </div>
    </div>
  );
};

export default AnatomyViewer;
