import { gradeAnswer, summarize, buildQuiz, AnswerRecord } from './quizEngine';
import { QuizQuestion } from '../types/study';

const question: QuizQuestion = {
  id: 'q1',
  question: '2 + 2 = ?',
  options: ['3', '4', '5'],
  correctAnswer: '4',
  topic: 'Math',
  difficulty: 'easy',
};

describe('gradeAnswer', () => {
  it('marks a matching selection correct', () => {
    expect(gradeAnswer(question, '4').correct).toBe(true);
  });

  it('marks a non-matching selection incorrect', () => {
    expect(gradeAnswer(question, '5').correct).toBe(false);
  });
});

describe('summarize', () => {
  it('computes accuracy from answer records', () => {
    const answers: AnswerRecord[] = [
      { questionId: 'a', selected: 'x', correct: true },
      { questionId: 'b', selected: 'y', correct: false },
      { questionId: 'c', selected: 'z', correct: true },
    ];
    const result = summarize(answers);
    expect(result.total).toBe(3);
    expect(result.correct).toBe(2);
    expect(result.accuracy).toBeCloseTo(2 / 3);
  });

  it('handles an empty answer set without dividing by zero', () => {
    expect(summarize([]).accuracy).toBe(0);
  });
});

describe('buildQuiz', () => {
  it('never returns more questions than requested', () => {
    const pool = [question, { ...question, id: 'q2' }, { ...question, id: 'q3' }];
    expect(buildQuiz(pool, 2)).toHaveLength(2);
  });
});
