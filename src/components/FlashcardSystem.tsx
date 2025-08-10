import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed: Date | null;
  nextReview: Date | null;
  reviewCount: number;
  correctCount: number;
  incorrectCount: number;
  tags: string[];
}

interface FlashcardSystemProps {
  category?: string;
}

const FlashcardSystem: React.FC<FlashcardSystemProps> = ({ category = 'all' }) => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<'new' | 'review' | 'all'>('all');
  const [stats, setStats] = useState({
    totalCards: 0,
    reviewedToday: 0,
    correctToday: 0,
    streak: 0
  });

  // Sample medical flashcards
  const sampleCards = useMemo(() => [
    {
      id: '1',
      front: 'What is the function of the sinoatrial (SA) node?',
      back: 'The SA node is the natural pacemaker of the heart, generating electrical impulses that initiate each heartbeat and control the heart rate.',
      category: 'Cardiology',
      difficulty: 'medium' as const,
      lastReviewed: null,
      nextReview: null,
      reviewCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      tags: ['heart', 'electrical', 'pacemaker']
    },
    {
      id: '2',
      front: 'Define the term "myocardial infarction"',
      back: 'Myocardial infarction, commonly known as a heart attack, occurs when blood flow to the heart muscle is blocked, causing damage or death to the heart tissue.',
      category: 'Cardiology',
      difficulty: 'hard' as const,
      lastReviewed: null,
      nextReview: null,
      reviewCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      tags: ['heart attack', 'blood flow', 'tissue damage']
    },
    {
      id: '3',
      front: 'What are the three main types of blood vessels?',
      back: 'Arteries (carry oxygenated blood away from heart), Veins (carry deoxygenated blood back to heart), and Capillaries (smallest vessels where gas exchange occurs).',
      category: 'Anatomy',
      difficulty: 'easy' as const,
      lastReviewed: null,
      nextReview: null,
      reviewCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      tags: ['blood vessels', 'circulation', 'gas exchange']
    },
    {
      id: '4',
      front: 'Explain the difference between systolic and diastolic blood pressure',
      back: 'Systolic pressure is the pressure when the heart contracts (pumps blood), while diastolic pressure is the pressure when the heart relaxes (fills with blood).',
      category: 'Physiology',
      difficulty: 'medium' as const,
      lastReviewed: null,
      nextReview: null,
      reviewCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      tags: ['blood pressure', 'heart cycle', 'pressure measurement']
    },
    {
      id: '5',
      front: 'What is the function of the cerebellum?',
      back: 'The cerebellum coordinates voluntary movements, maintains balance and posture, and helps with motor learning and fine motor control.',
      category: 'Neurology',
      difficulty: 'medium' as const,
      lastReviewed: null,
      nextReview: null,
      reviewCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      tags: ['brain', 'movement', 'coordination', 'balance']
    }
  ], []);

  useEffect(() => {
    setCards(sampleCards);
    setStats(prev => ({ ...prev, totalCards: sampleCards.length }));
  }, [sampleCards]);

  const currentCard = cards[currentCardIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (wasCorrect: boolean) => {
    if (!currentCard) return;

    const updatedCards = [...cards];
    const card = updatedCards[currentCardIndex];
    
    card.reviewCount++;
    card.lastReviewed = new Date();
    
    if (wasCorrect) {
      card.correctCount++;
      // Spaced repetition: increase interval for correct answers
      const interval = Math.min(card.reviewCount * 2, 30); // Max 30 days
      card.nextReview = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);
    } else {
      card.incorrectCount++;
      // Reset interval for incorrect answers
      card.nextReview = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    }

    setCards(updatedCards);
    setStats(prev => ({
      ...prev,
      reviewedToday: prev.reviewedToday + 1,
      correctToday: prev.correctToday + (wasCorrect ? 1 : 0)
    }));

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
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cardiology': return '❤️';
      case 'Anatomy': return '🫀';
      case 'Physiology': return '🧬';
      case 'Neurology': return '🧠';
      case 'Pathology': return '🔬';
      case 'Pharmacology': return '💊';
      default: return '📚';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Medical Flashcards
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master medical concepts with intelligent spaced repetition and beautiful, interactive cards
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform">
                {stats.totalCards}
              </div>
              <div className="text-sm text-gray-600 font-medium">Total Cards</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-emerald-600 group-hover:scale-110 transition-transform">
                {stats.reviewedToday}
              </div>
              <div className="text-sm text-gray-600 font-medium">Reviewed Today</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform">
                {stats.correctToday}
              </div>
              <div className="text-sm text-gray-600 font-medium">Correct Today</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-orange-600 group-hover:scale-110 transition-transform">
                {stats.streak}
              </div>
              <div className="text-sm text-gray-600 font-medium">Day Streak</div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setStudyMode('new')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                studyMode === 'new' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🆕 New Cards
            </button>
            <button
              onClick={() => setStudyMode('review')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                studyMode === 'review' 
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔄 Review Due
            </button>
            <button
              onClick={() => setStudyMode('all')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                studyMode === 'all' 
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📚 All Cards
            </button>
            <button
              onClick={resetSession}
              className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-200"
            >
              🔄 Reset Session
            </button>
          </div>
        </motion.div>

        {/* Flashcard */}
        {currentCard && (
          <motion.div 
            key={currentCardIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8"
          >
            {/* Progress */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 font-medium">
                  Card {currentCardIndex + 1} of {cards.length}
                </span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
                  />
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getDifficultyColor(currentCard.difficulty)}`}>
                {currentCard.difficulty}
              </span>
            </div>

            {/* Category */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold border border-blue-200">
                <span className="text-lg">{getCategoryIcon(currentCard.category)}</span>
                {currentCard.category}
              </span>
            </div>

            {/* Card */}
            <div className="relative h-96 mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isFlipped ? 'back' : 'front'}
                  initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 flex items-center justify-center cursor-pointer border-2 border-white/50 shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={handleFlip}
                >
                  <div className="text-center max-w-2xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      {isFlipped ? '💡 Answer' : '❓ Question'}
                    </h3>
                    <p className="text-xl text-gray-700 leading-relaxed font-medium">
                      {isFlipped ? currentCard.back : currentCard.front}
                    </p>
                    {isFlipped && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                      >
                        <div className="flex flex-wrap gap-2 justify-center">
                          {currentCard.tags.map((tag: string, index: number) => (
                            <span key={index} className="px-3 py-1 bg-white/70 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    <div className="mt-6 text-sm text-gray-500">
                      Click to {isFlipped ? 'see question' : 'reveal answer'}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Answer Buttons */}
            {isFlipped && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-6 justify-center"
              >
                <button
                  onClick={() => handleAnswer(false)}
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transform hover:scale-105"
                >
                  ❌ Incorrect
                </button>
                <button
                  onClick={() => handleAnswer(true)}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transform hover:scale-105"
                >
                  ✅ Correct
                </button>
              </motion.div>
            )}

            {/* Card Stats */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-6 bg-gray-50 rounded-xl px-6 py-3">
                <span className="text-sm text-gray-600">
                  <span className="font-semibold">Reviews:</span> {currentCard.reviewCount}
                </span>
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-emerald-600">Correct:</span> {currentCard.correctCount}
                </span>
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-red-600">Incorrect:</span> {currentCard.incorrectCount}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Completion Message */}
        {currentCardIndex >= cards.length && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12 text-center"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Session Complete!</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              You've reviewed all cards in this session. Great job! Keep up the excellent work.
            </p>
            <button
              onClick={resetSession}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105"
            >
              🔄 Start New Session
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FlashcardSystem;
