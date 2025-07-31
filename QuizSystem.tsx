import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  Target,
  TrendingUp,
  Brain,
  Heart,
  Activity
} from 'lucide-react';
import { useStudyStore } from '../../stores/studyStore';
import { useQuizData } from '../../hooks/useQuizData';
import ProgressBar from '../../components/UI/ProgressBar';
import Timer from '../../components/Study/Timer';
import toast from 'react-hot-toast';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl?: string;
  topic: string;
}

interface QuizState {
  currentQuestion: number;
  answers: Record<number, string>;
  timeRemaining: number;
  isReviewMode: boolean;
  showExplanations: boolean;
}

const QuizSystem: React.FC = () => {
  const { topic = 'all', mode = 'practice' } = useParams();
  const navigate = useNavigate();
  const {
    submitQuizAnswer,
    updateProgress,
    startSession,
    endSession,
    currentSession
  } = useStudyStore();

  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    timeRemaining: mode === 'timed' ? 1800 : 0, // 30 minutes for timed mode
    isReviewMode: false,
    showExplanations: false,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Load quiz questions
  const { data: questions, isLoading } = useQuizData(topic, mode);
  const currentQ = questions?.[quizState.currentQuestion];

  useEffect(() => {
    if (!currentSession && questions && questions.length > 0) {
      startSession(`quiz-${topic}`);
    }

    return () => {
      if (currentSession) {
        endSession();
      }
    };
  }, [topic, questions]);

  // Timer for timed mode
  useEffect(() => {
    if (mode === 'timed' && quizState.timeRemaining > 0 && !quizState.isReviewMode) {
      const timer = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);

      return () => clearInterval(timer);
    } else if (quizState.timeRemaining === 0 && mode === 'timed') {
      handleQuizComplete();
    }
  }, [quizState.timeRemaining, mode, quizState.isReviewMode]);

  const handleAnswerSelect = (answer: string) => {
    if (quizState.isReviewMode || showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQ) return;

    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    
    // Update progress
    updateProgress(currentQ.topic, isCorrect);
    submitQuizAnswer(currentQ.id, selectedAnswer, isCorrect);

    // Save answer
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentQuestion]: selectedAnswer,
      },
    }));

    setShowResult(true);

    // Auto-advance in practice mode
    if (mode === 'practice') {
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    }
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      handleQuizComplete();
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
      const prevAnswer = quizState.answers[quizState.currentQuestion - 1];
      setSelectedAnswer(prevAnswer || null);
      setShowResult(quizState.isReviewMode);
    }
  };

  const handleQuizComplete = () => {
    const totalQuestions = questions.length;
    const correctAnswers = Object.entries(quizState.answers).filter(
      ([index, answer]) => questions[parseInt(index)].correctAnswer === answer
    ).length;

    const score = Math.round((correctAnswers / totalQuestions) * 100);

    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-xl shadow-2xl max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Quiz Complete! 🎉</h2>
        
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-blue-600 mb-2">{score}%</div>
          <p className="text-gray-600">Your Score</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span>Questions:</span>
            <span className="font-semibold">{totalQuestions}</span>
          </div>
          <div className="flex justify-between">
            <span>Correct:</span>
            <span className="font-semibold text-green-600">{correctAnswers}</span>
          </div>
          <div className="flex justify-between">
            <span>Incorrect:</span>
            <span className="font-semibold text-red-600">
              {totalQuestions - correctAnswers}
            </span>
          </div>
          {mode === 'timed' && (
            <div className="flex justify-between">
              <span>Time Used:</span>
              <span className="font-semibold">
                {Math.floor((1800 - quizState.timeRemaining) / 60)}:
                {String((1800 - quizState.timeRemaining) % 60).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              setQuizState({
                ...quizState,
                isReviewMode: true,
                currentQuestion: 0,
              });
              setSelectedAnswer(quizState.answers[0] || null);
              setShowResult(true);
            }}
            className="btn btn-secondary flex-1"
          >
            Review Answers
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              navigate('/study');
            }}
            className="btn btn-primary flex-1"
          >
            Back to Study
          </button>
        </div>
      </motion.div>
    ), {
      duration: Infinity,
      position: 'center',
    });
  };

  const getOptionClass = (option: string) => {
    if (!showResult && !quizState.isReviewMode) {
      return selectedAnswer === option ? 'selected' : '';
    }

    if (option === currentQ?.correctAnswer) {
      return 'correct';
    }

    if (option === selectedAnswer && option !== currentQ?.correctAnswer) {
      return 'incorrect';
    }

    return '';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No quiz questions available</h3>
        <p className="text-gray-600 mb-4">Select a different topic or create questions!</p>
        <button
          onClick={() => navigate('/study')}
          className="btn btn-primary"
        >
          Back to Study
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-system">
      {/* Header */}
      <div className="quiz-header">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {mode === 'timed' ? 'Timed Quiz' : 'Practice Quiz'}
            </h1>
            <p className="text-gray-600">Topic: {topic}</p>
          </div>
          
          {mode === 'timed' && !quizState.isReviewMode && (
            <Timer
              duration={quizState.timeRemaining}
              onComplete={handleQuizComplete}
              className="text-2xl font-mono"
            />
          )}
        </div>

        {/* Progress */}
        <ProgressBar
          current={quizState.currentQuestion + 1}
          total={questions.length}
          label={`Question ${quizState.currentQuestion + 1} of ${questions.length}`}
        />

        {/* Question Navigation (for timed mode) */}
        {mode === 'timed' && (
          <div className="grid grid-cols-10 gap-2 mt-4">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuizState(prev => ({ ...prev, currentQuestion: index }));
                  setSelectedAnswer(quizState.answers[index] || null);
                  setShowResult(quizState.isReviewMode);
                }}
                className={`
                  question-nav-btn
                  ${index === quizState.currentQuestion ? 'active' : ''}
                  ${quizState.answers[index] ? 'answered' : ''}
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={quizState.currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="quiz-content"
        >
          <div className="question-card">
            {/* Difficulty Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className={`difficulty-badge ${currentQ?.difficulty}`}>
                {currentQ?.difficulty}
              </span>
              <span className="text-sm text-gray-600">{currentQ?.category}</span>
            </div>

            {/* Question */}
            <h3 className="text-xl font-semibold mb-6">{currentQ?.question}</h3>

            {/* Image if available */
