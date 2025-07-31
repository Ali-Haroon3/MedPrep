import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { 
  StudySession, 
  FlashCard, 
  QuizQuestion, 
  StudyProgress,
  StudyGoal,
  Note
} from '../types/study';

interface StudyState {
  // User Progress
  progress: StudyProgress;
  studyStreak: number;
  totalStudyTime: number;
  lastStudyDate: string | null;

  // Study Sessions
  currentSession: StudySession | null;
  sessionHistory: StudySession[];
  
  // Flashcards
  flashcards: Record<string, FlashCard[]>;
  flashcardProgress: Record<string, number>;
  
  // Quiz
  quizQuestions: Record<string, QuizQuestion[]>;
  quizScores: Array<{
    topic: string;
    score: number;
    total: number;
    date: string;
  }>;
  
  // Notes
  notes: Note[];
  
  // Goals
  goals: StudyGoal[];
  
  // Actions
  startSession: (topic: string) => void;
  endSession: () => void;
  updateProgress: (topic: string, correct: boolean) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  addFlashcard: (topic: string, card: Omit<FlashCard, 'id'>) => void;
  markFlashcardReviewed: (topic: string, cardId: string, correct: boolean) => void;
  submitQuizAnswer: (questionId: string, answer: string, isCorrect: boolean) => void;
  setGoal: (goal: Omit<StudyGoal, 'id' | 'progress'>) => void;
  updateGoalProgress: (goalId: string) => void;
  addViewedModel: (model: string) => void;
  saveAnnotation: (model: string, annotation: any) => void;
  updateStudyStreak: () => void;
  getTopicMastery: (topic: string) => number;
  getRecommendedTopics: () => string[];
}

export const useStudyStore = create<StudyState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        progress: {
          totalQuestions: 0,
          correctAnswers: 0,
          topicsMastery: {},
          weakAreas: [],
          strongAreas: [],
        },
        studyStreak: 0,
        totalStudyTime: 0,
        lastStudyDate: null,
        currentSession: null,
        sessionHistory: [],
        flashcards: {},
        flashcardProgress: {},
        quizQuestions: {},
        quizScores: [],
        notes: [],
        goals: [],

        // Actions
        startSession: (topic) => {
          const session: StudySession = {
            id: `session-${Date.now()}`,
            topic,
            startTime: new Date().toISOString(),
            endTime: null,
            questionsAnswered: 0,
            correctAnswers: 0,
            flashcardsReviewed: 0,
            notesCreated: 0,
          };
          
          set({ currentSession: session });
          get().updateStudyStreak();
        },

        endSession: () => {
          const { currentSession } = get();
          if (!currentSession) return;

          const endedSession = {
            ...currentSession,
            endTime: new Date().toISOString(),
          };

          set((state) => ({
            currentSession: null,
            sessionHistory: [...state.sessionHistory, endedSession],
            totalStudyTime: state.totalStudyTime + 
              (new Date(endedSession.endTime!).getTime() - 
               new Date(endedSession.startTime).getTime()) / 1000,
          }));
        },

        updateProgress: (topic, correct) => {
          set((state) => {
            const newProgress = { ...state.progress };
            newProgress.totalQuestions++;
            if (correct) newProgress.correctAnswers++;

            // Update topic mastery
            if (!newProgress.topicsMastery[topic]) {
              newProgress.topicsMastery[topic] = { correct: 0, total: 0 };
            }
            newProgress.topicsMastery[topic].total++;
            if (correct) newProgress.topicsMastery[topic].correct++;

            // Update weak/strong areas
            const mastery = (newProgress.topicsMastery[topic].correct / 
                           newProgress.topicsMastery[topic].total) * 100;
            
            if (mastery < 60 && !newProgress.weakAreas.includes(topic)) {
              newProgress.weakAreas.push(topic);
              newProgress.strongAreas = newProgress.strongAreas.filter(t => t !== topic);
            } else if (mastery > 80 && !newProgress.strongAreas.includes(topic)) {
              newProgress.strongAreas.push(topic);
              newProgress.weakAreas = newProgress.weakAreas.filter(t => t !== topic);
            }

            // Update current session
            if (state.currentSession) {
              state.currentSession.questionsAnswered++;
              if (correct) state.currentSession.correctAnswers++;
            }

            return { progress: newProgress };
          });
        },

        addNote: (noteData) => {
          const note: Note = {
            id: `note-${Date.now()}`,
            ...noteData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set((state) => ({
            notes: [note, ...state.notes],
          }));

          // Update session
          const { currentSession } = get();
          if (currentSession) {
            currentSession.notesCreated++;
          }
        },

        updateNote: (id, updates) => {
          set((state) => ({
            notes: state.notes.map(note =>
              note.id === id
                ? { ...note, ...updates, updatedAt: new Date().toISOString() }
                : note
            ),
          }));
        },

        deleteNote: (id) => {
          set((state) => ({
            notes: state.notes.filter(note => note.id !== id),
          }));
        },

        addFlashcard: (topic, cardData) => {
          const card: FlashCar
