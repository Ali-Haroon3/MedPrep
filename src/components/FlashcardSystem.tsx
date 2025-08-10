import React, { useState, useEffect } from 'react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

const FlashcardSystem: React.FC = () => {
  const [cards] = useState<Flashcard[]>([
    {
      id: '1',
      front: 'What is the function of the sinoatrial (SA) node?',
      back: 'The SA node is the natural pacemaker of the heart, generating electrical impulses that initiate each heartbeat and control the heart rate.',
      category: 'Cardiology',
      difficulty: 'medium',
      tags: ['heart', 'electrical', 'pacemaker']
    },
    {
      id: '2',
      front: 'Define the term "myocardial infarction"',
      back: 'Myocardial infarction, commonly known as a heart attack, occurs when blood flow to the heart muscle is blocked, causing damage or death to the heart tissue.',
      category: 'Cardiology',
      difficulty: 'hard',
      tags: ['heart attack', 'blood flow', 'tissue damage']
    },
    {
      id: '3',
      front: 'What are the three main types of blood vessels?',
      back: 'Arteries (carry oxygenated blood away from heart), Veins (carry deoxygenated blood back to heart), and Capillaries (smallest vessels where gas exchange occurs).',
      category: 'Anatomy',
      difficulty: 'easy',
      tags: ['blood vessels', 'circulation', 'gas exchange']
    }
  ]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const currentCard = cards[currentCardIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
    }

    // Move to next card
    setTimeout(() => {
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
      }
    }, 1000);
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setCorrectCount(0);
    setIncorrectCount(0);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
            Medical Flashcards
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Master medical concepts with spaced repetition
          </p>
        </div>

        {/* Progress */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <span style={{ color: '#6b7280' }}>
            Card {currentCardIndex + 1} of {cards.length}
          </span>
          <span style={{ color: '#6b7280' }}>
            {Math.round(((currentCardIndex + 1) / cards.length) * 100)}% complete
          </span>
        </div>

        {/* Main Flashcard */}
        {currentCard && (
          <div style={{ marginBottom: '2rem' }}>
            
            {/* Flashcard */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '3rem',
              textAlign: 'center',
              cursor: 'pointer',
              minHeight: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e5e7eb'
            }} onClick={handleFlip}>
              
              <div>
                <div style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280', 
                  marginBottom: '1rem',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {isFlipped ? 'ANSWER' : 'QUESTION'}
                </div>
                
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600', 
                  color: '#1f2937',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {isFlipped ? currentCard.back : currentCard.front}
                </div>

                {isFlipped && currentCard.tags.length > 0 && (
                  <div style={{ marginTop: '1.5rem' }}>
                    {currentCard.tags.map((tag, index) => (
                      <span key={index} style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        margin: '0.25rem',
                        backgroundColor: '#dbeafe',
                        color: '#1d4ed8',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ 
                  marginTop: '1.5rem', 
                  fontSize: '0.875rem', 
                  color: '#9ca3af' 
                }}>
                  Click to {isFlipped ? 'see question' : 'reveal answer'}
                </div>
              </div>
            </div>

            {/* Card Info */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '2rem',
              marginTop: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>
                  {currentCard.category === 'Cardiology' ? '❤️' : 
                   currentCard.category === 'Anatomy' ? '🫀' : '📚'}
                </span>
                <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {currentCard.category}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: currentCard.difficulty === 'easy' ? '#10b981' :
                                   currentCard.difficulty === 'medium' ? '#f59e0b' : '#ef4444'
                }}></div>
                <span style={{ color: '#6b7280', fontSize: '0.875rem', textTransform: 'capitalize' }}>
                  {currentCard.difficulty}
                </span>
              </div>
            </div>

            {/* Answer Buttons */}
            {isFlipped && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '1rem',
                marginTop: '2rem'
              }}>
                <button
                  onClick={() => handleAnswer(false)}
                  style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  ❌ Incorrect
                </button>
                <button
                  onClick={() => handleAnswer(true)}
                  style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  ✅ Correct
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '1rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
                {cards.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total Cards</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                {correctCount + incorrectCount}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Reviewed</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                {correctCount}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Correct</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                {incorrectCount}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Incorrect</div>
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {currentCardIndex >= cards.length && (
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
              Session Complete!
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              You've reviewed all cards in this session. Great job!
            </p>
            <button
              onClick={resetSession}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Start New Session
            </button>
          </div>
        )}

        {/* Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem'
        }}>
          <button
            onClick={resetSession}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Reset Session
          </button>
        </div>

      </div>
    </div>
  );
};

export default FlashcardSystem;
