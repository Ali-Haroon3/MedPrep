// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'student' | 'premium' | 'admin';
  createdAt: string;
  updatedAt: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    studyReminders: boolean;
  };
  studyGoals: {
    dailyMinutes: number;
    weeklyQuizzes: number;
  };
}

// Anatomy Types
export type AnatomySystem = 'brain' | 'heart' | 'lungs' | 'skeleton' | 'muscular' | 'digestive' | 'immune' | 'endocrine';

export type ModelLayer = 'surface' | 'deep' | 'internal' | 'vascular' | 'nervous';

export type ViewMode = '3d' | 'xray' | 'mri' | 'cross-section';

export interface AnatomySystemDetail {
  id: string;
  name: string;
  description: string;
  models: Model3D[];
  relatedSystems: string[];
  clinicalRelevance: string[];
  commonPathologies: Pathology[];
}

export interface Model3D {
  id: string;
  name: string;
  systemId: string;
  modelUrl: string;
  thumbnailUrl: string;
  layers: ModelLayer[];
  annotations: Annotation[];
  metadata: ModelMetadata;
}

export interface ModelMetadata {
  vertices: number;
  faces: number;
  fileSize: number;
  format: 'gltf' | 'glb' | 'obj';
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
}

export interface Annotation {
  id: string;
  modelId: string;
  partId: string;
  position: [number, number, number];
  text: string;
  author: string;
  createdAt: string;
  tags: string[];
}

export interface AnnotationPoint {
  id?: string;
  partId: string;
  text: string;
  position: [number, number, number];
  timestamp?: string;
}

export interface Pathology {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  treatments: string[];
  affectedAreas: string[];
}

// Study Types
export interface StudySession {
  id: string;
  userId?: string;
  topic: string;
  startTime: string;
  endTime: string | null;
  questionsAnswered: number;
  correctAnswers: number;
  flashcardsReviewed: number;
  notesCreated: number;
  modelInteractions?: number;
}

export interface FlashCard {
  id: string;
  question: string;
  answer: string;
  topic: string;
  subtopic?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  imageUrl?: string;
  explanation?: string;
  reviewCount: number;
  correctCount: number;
  lastReviewed: string | null;
  nextReview: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
  topic: string;
  subtopic?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl?: string;
  timeLimit?: number;
  points: number;
  tags: string[];
}

export interface QuizResult {
  id: string;
  userId: string;
  quizId?: string;
  topic: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  answers: QuizAnswer[];
  completedAt: string;
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  topic: string;
  tags: string[];
  attachments?: Attachment[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'pdf' | 'video';
  size: number;
}

export interface StudyProgress {
  totalQuestions: number;
  correctAnswers: number;
  topicsMastery: Record<string, TopicMastery>;
  weakAreas: string[];
  strongAreas: string[];
  streakDays: number;
  totalStudyTime: number;
  lastStudyDate: string | null;
}

export interface TopicMastery {
  correct: number;
  total: number;
  lastPracticed: string;
  averageTime: number;
}

export interface StudyGoal {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  metric: 'questions' | 'time' | 'topics' | 'accuracy';
  target: number;
  current: number;
  progress: number;
  deadline: string;
  completed: boolean;
  createdAt: string;
}

export interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: string | null;
  streakHistory: StreakDay[];
}

export interface StreakDay {
  date: string;
  studied: boolean;
  minutesStudied: number;
  questionsAnswered: number;
}

// Resource Types
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'pdf' | 'interactive';
  category: string;
  url: string;
  duration?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  isPremium: boolean;
  rating: number;
  views: number;
  createdAt: string;
}

// API Types
export interface ApiError {
  message: string;
  code: string;
  field?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface CreateFlashCardData {
  question: string;
  answer: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  explanation?: string;
  imageUrl?: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  topic: string;
  tags: string[];
  isPublic: boolean;
}

// Analytics Types
export interface StudyStats {
  timeframe: 'week' | 'month' | 'year';
  totalTime: number;
  questionsAnswered: number;
  accuracy: number;
  topicsStudied: string[];
  dailyStats: DailyStat[];
  performanceByTopic: Record<string, TopicPerformance>;
}

export interface DailyStat {
  date: string;
  studyTime: number;
  questionsAnswered: number;
  correctAnswers: number;
  topicsReviewed: string[];
}

export interface TopicPerformance {
  topic: string;
  questionsAnswered: number;
  accuracy: number;
  averageTime: number;
  lastStudied: string;
  trend: 'improving' | 'stable' | 'declining';
}

// WebSocket Types
export interface WSMessage {
  type: 'notification' | 'progress' | 'collaboration';
  payload: any;
  timestamp: string;
}

export interface Notification {
  id: string;
  type: 'achievement' | 'reminder' | 'system' | 'social';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
