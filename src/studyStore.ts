import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import {
  StudySession,
  FlashCard,
  QuizQuestion,
  StudyProgress,
  StudyGoal,
  Note
} from './types/study';

interface StudyState {
  // User Progress
  progress: StudyProgress;
  studyStreak: number;
  totalStudyTime: number;
  lastStudyDate: string | null;

  // Study Sessions
  sessions: StudySession[];
  currentSession: StudySession | null;

  // Flashcards
  flashcards: FlashCard[];
  currentFlashcard: FlashCard | null;

  // Quiz Questions
  quizQuestions: QuizQuestion[];
  currentQuiz: QuizQuestion[];

  // Study Goals
  goals: StudyGoal[];

  // Notes
  notes: Note[];

  // Actions
  startSession: (topics: string[]) => void;
  endSession: (score?: number) => void;
  addFlashcard: (card: Omit<FlashCard, 'id'>) => void;
  updateProgress: (topic: string, score: number, timeSpent: number) => void;
  addGoal: (goal: Omit<StudyGoal, 'id'>) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const initialState: Omit<StudyState, 'startSession' | 'endSession' | 'addFlashcard' | 'updateProgress' | 'addGoal' | 'addNote'> = {
  progress: {
    topics: {},
    overallScore: 0,
    totalTimeSpent: 0
  },
  studyStreak: 0,
  totalStudyTime: 0,
  lastStudyDate: null,
  sessions: [],
  currentSession: null,
  flashcards: [],
  currentFlashcard: null,
  quizQuestions: [],
  currentQuiz: [],
  goals: [],
  notes: []
};

export const useStudyStore = create<StudyState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        startSession: (topics: string[]) => {
          const session: StudySession = {
            id: Date.now().toString(),
            startTime: new Date(),
            duration: 0,
            topics
          };
          set({ currentSession: session });
        },

        endSession: (score?: number) => {
          const { currentSession } = get();
          if (currentSession) {
            const endTime = new Date();
            const duration = endTime.getTime() - currentSession.startTime.getTime();
            const updatedSession = { ...currentSession, endTime, duration, score };
            
            set(state => ({
              sessions: [...state.sessions, updatedSession],
              currentSession: null,
              totalStudyTime: state.totalStudyTime + duration
            }));
          }
        },

        addFlashcard: (card: Omit<FlashCard, 'id'>) => {
          const newCard: FlashCard = {
            ...card,
            id: Date.now().toString(),
            reviewCount: 0
          };
          set(state => ({ flashcards: [...state.flashcards, newCard] }));
        },

        updateProgress: (topic: string, score: number, timeSpent: number) => {
          set(state => ({
            progress: {
              ...state.progress,
              topics: {
                ...state.progress.topics,
                [topic]: {
                  completed: score >= 70,
                  score,
                  lastStudied: new Date(),
                  timeSpent: (state.progress.topics[topic]?.timeSpent || 0) + timeSpent
                }
              },
              overallScore: Object.values(state.progress.topics).reduce((acc, t) => acc + t.score, score) / (Object.keys(state.progress.topics).length + 1)
            }
          }));
        },

        addGoal: (goal: Omit<StudyGoal, 'id'>) => {
          const newGoal: StudyGoal = {
            ...goal,
            id: Date.now().toString(),
            completed: false
          };
          set(state => ({ goals: [...state.goals, newGoal] }));
        },

        addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
          const now = new Date();
          const newNote: Note = {
            ...note,
            id: Date.now().toString(),
            createdAt: now,
            updatedAt: now
          };
          set(state => ({ notes: [...state.notes, newNote] }));
        }
      }),
      {
        name: 'study-storage'
      }
    )
  )
);

