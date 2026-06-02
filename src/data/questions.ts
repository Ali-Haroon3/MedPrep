import { QuizQuestion } from '../types/study';

// Multiple-choice question bank grouped loosely by system. `correctAnswer`
// stores the literal option text so grading stays independent of ordering.

export const questionBank: QuizQuestion[] = [
  {
    id: 'q-card-1',
    question: 'The sinoatrial (SA) node is located in which chamber of the heart?',
    options: ['Left ventricle', 'Right atrium', 'Left atrium', 'Right ventricle'],
    correctAnswer: 'Right atrium',
    explanation: 'The SA node sits in the wall of the right atrium near the entry of the superior vena cava.',
    topic: 'Cardiology',
    difficulty: 'easy',
  },
  {
    id: 'q-card-2',
    question: 'During which cardiac phase are all four heart valves closed?',
    options: ['Isovolumetric contraction', 'Rapid ejection', 'Atrial systole', 'Rapid filling'],
    correctAnswer: 'Isovolumetric contraction',
    explanation: 'In isovolumetric contraction the ventricles contract with all valves shut, so volume is constant while pressure rises.',
    topic: 'Cardiology',
    difficulty: 'hard',
  },
  {
    id: 'q-resp-1',
    question: 'Oxygen diffuses from alveoli into blood primarily because of a difference in what?',
    options: ['pH', 'Partial pressure', 'Temperature', 'Hemoglobin count'],
    correctAnswer: 'Partial pressure',
    explanation: 'Gas exchange is driven by the partial-pressure gradient of O2 across the alveolar membrane.',
    topic: 'Respiratory',
    difficulty: 'easy',
  },
  {
    id: 'q-resp-2',
    question: 'A rightward shift of the oxygen-hemoglobin dissociation curve indicates what?',
    options: [
      'Increased O2 affinity',
      'Decreased O2 affinity',
      'No change in affinity',
      'Complete O2 saturation',
    ],
    correctAnswer: 'Decreased O2 affinity',
    explanation: 'A right shift (higher CO2, lower pH, higher temperature) lowers hemoglobin affinity, favoring O2 unloading in tissues.',
    topic: 'Respiratory',
    difficulty: 'medium',
  },
];

export function questionsByTopic(topic: string): QuizQuestion[] {
  return questionBank.filter((q) => q.topic === topic);
}
