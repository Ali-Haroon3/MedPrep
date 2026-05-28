export interface StudySession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  topics: string[];
  score?: number;
}

export interface FlashCard {
  id: string;
  front: string;
  back: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
  nextReview?: Date;
  reviewCount: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface StudyProgress {
  topics: {
    [topic: string]: {
      completed: boolean;
      score: number;
      lastStudied: Date;
      timeSpent: number;
    };
  };
  overallScore: number;
  totalTimeSpent: number;
}

export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  targetScore: number;
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  topic: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}


// --- Spaced repetition scheduling (added for SM-2 support) ---

export interface CardSchedule {
  cardId: string;
  repetitions: number;
  easeFactor: number;
  interval: number;
  dueDate: string; // ISO date the card is next due for review
  lastQuality?: number;
}

export interface ReviewLog {
  cardId: string;
  reviewedAt: string; // ISO timestamp
  quality: number; // 0-5 recall quality
  intervalAfter: number;
}
