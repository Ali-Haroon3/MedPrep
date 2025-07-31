import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Brain, 
  Heart, 
  Activity, 
  ChevronLeft, 
  ChevronRight,
  RotateCw,
  BookOpen,
  Target,
  TrendingUp
} from 'lucide-react';
import { useStudyStore } from '../../stores/studyStore';
import { useFlashcardData } from '../../hooks/useFlashcardData';
import ProgressBar from '../../components/UI/ProgressBar';
import StudyTimer from '../../components/Study/StudyTimer';
import toast from 'react-hot-toast';

interface FlashcardProps {
  question: string;
  answer: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  imageUrl?: string;
  explanation?: string;
}

const FlashcardSystem: React.FC = () => {
  const { topic = 'all' } = useParams();
  const navigate = useNavigate();
  const { 
    flashcards, 
    markFlashcardReviewed, 
    startSession,
    endSession,
    currentSession 
  } = useStudyStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    reviewed: 0,
    correct: 0,
    incorrect: 0,
  });

  // Load flashcards for current topic
  const { data: topicCards, isLoading } = useFlashcardData(topic);
  const cards = topicCards || flashcards[topic] || [];
  const currentCard = cards[currentIndex];

  useEffect(() => {
    if (!currentSession && cards.length > 0) {
      startSession(topic);
    }
    
    return () => {
      if (currentSession) {
        endSession();
      }
    };
  }, [topic]);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowExplanation(false);
    } else {
      // Session complete
      showSessionSummary();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setShowExplanation(false);
    }
  };

  const handleCardResponse = (correct: boolean) => {
    if (!currentCard) return;

    markFlashcardReviewed(topic, currentCard.id, correct);
    
    setSessionStats(prev => ({
      reviewed: prev.reviewed + 1,
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
    }));

    if (correct) {
      toast.success('Great job! 🎉');
    } else {
      toast.error('Keep practicing! 💪');
    }

    setTimeout(handleNext, 1000);
  };

  const showSessionSummary = () => {
    const accuracy = sessionStats.reviewed > 0 
      ? (sessionStats.correct / sessionStats.reviewed * 100).toFixed(1)
      : 0;

    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white p-6 rounded-lg shadow-xl max-w-md"
      >
        <h3 className="text-xl font-bold mb-4">Session Complete! 🎯</h3>
        <div className="space-y-2 mb-4">
          <p>Cards Reviewed: {sessionStats.reviewed}</p>
          <p>Correct: {sessionStats.correct}</p>
          <p>Accuracy: {accuracy}%</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              navigate('/study');
            }}
            className="btn btn-primary"
          >
            Back to Study
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              setCurrentIndex(0);
              setSessionStats({ reviewed: 0, correct: 0, incorrect: 0 });
            }}
            className="btn btn-secondary"
          >
            Study Again
          </button>
        </div>
      </motion.div>
    ), {
      duration: Infinity,
      position: 'center',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No flashcards available</h3>
        <p className="text-gray-600 mb-4">Create some flashcards to start studying!</p>
        <button
          onClick={() => navigate('/study/create-flashcard')}
          className="btn btn-primary"
        >
          Create Flashcards
        </button>
      </div>
    );
  }

  return (
    <div className="flashcard-system">
      {/* Header */}
      <div className="flashcard-header">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Flashcard Study</h1>
            <p className="text-gray-600">Topic: {topic}</p>
          </div>
          <StudyTimer />
        </div>

        {/* Progress */}
        <ProgressBar
          current={currentIndex + 1}
          total={cards.length}
          label={`Card ${currentIndex + 1} of ${cards.length}`}
        />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="stat-card">
            <Activity className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Reviewed</span>
            <span className="text-lg font-semibold">{sessionStats.reviewed}</span>
          </div>
          <div className="stat-card">
            <Target className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">Correct</span>
            <span className="text-lg font-semibold">{sessionStats.correct}</span>
          </div>
          <div className="stat-card">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-600">Accuracy</span>
            <span className="text-lg font-semibold">
              {sessionStats.reviewed > 0 
                ? Math.round(sessionStats.correct / sessionStats.reviewed * 100)
                : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="flashcard-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flashcard-wrapper"
          >
            <div
              className={`flashcard ${isFlipped ? 'flipped' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="flashcard-face flashcard-front">
                <div className="flashcard-content">
                  {currentCard?.imageUrl && (
                    <img 
                      src={currentCard.imageUrl} 
                      alt="Flashcard visual"
                      className="w-full max-w-md mx-auto mb-6 rounded-lg"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-center">
                    {currentCard?.question}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {currentCard?.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Click to reveal answer
                  </p>
                </div>
              </div>

              <div className="flashcard-face flashcard-back">
                <div className="flashcard-content">
                  <h4 className="text-lg font-semibold mb-4">Answer:</h4>
                  <p className="text-center mb-6">{currentCard?.answer}</p>
                  
                  {currentCard?.explanation && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowExplanation(!showExplanation);
                      }}
                      className="text-blue-600 text-sm underline"
                    >
                      {showExplanation ? 'Hide' : 'Show'} Explanation
                    </button>
                  )}
                  
                  {showExplanation && currentCard?.explanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <p className="text-sm">{currentCard.explanation}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Response Buttons */}
            {isFlipped && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 justify-center mt-6"
              >
                <button
                  onClick={() => handleCardResponse(false)}
                  className="btn btn-danger"
                >
                  Incorrect
                </button>
                <button
                  onClick={() => handleCardResponse(true)}
                  className="btn btn-success"
                >
                  Correct
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flashcard-navigation">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="btn btn-secondary"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="btn btn-primary"
        >
          <RotateCw className="w-5 h-5" />
          Flip Card
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className="btn btn-secondary"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardSystem;
