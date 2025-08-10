import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlashcardCreatorProps {
  onCardCreated: (card: any) => void;
  onClose: () => void;
}

const FlashcardCreator: React.FC<FlashcardCreatorProps> = ({ onCardCreated, onClose }) => {
  const [formData, setFormData] = useState({
    front: '',
    back: '',
    category: 'Anatomy',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    tags: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Anatomy', 'Physiology', 'Pathology', 'Pharmacology', 'Cardiology',
    'Neurology', 'Endocrinology', 'Immunology', 'Microbiology', 'Biochemistry',
    'Genetics', 'Epidemiology', 'Clinical Skills', 'Medical Ethics', 'Emergency Medicine'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.front.trim()) {
      newErrors.front = 'Question is required';
    }
    if (!formData.back.trim()) {
      newErrors.back = 'Answer is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newCard = {
      id: Date.now().toString(),
      front: formData.front.trim(),
      back: formData.back.trim(),
      category: formData.category,
      difficulty: formData.difficulty,
      lastReviewed: null,
      nextReview: null,
      reviewCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    onCardCreated(newCard);
    
    // Reset form
    setFormData({
      front: '',
      back: '',
      category: 'Anatomy',
      difficulty: 'medium',
      tags: ''
    });
    
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create New Flashcard</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question *
            </label>
            <textarea
              value={formData.front}
              onChange={(e) => handleInputChange('front', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.front ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={3}
              placeholder="Enter your medical question here..."
            />
            {errors.front && (
              <p className="mt-1 text-sm text-red-600">{errors.front}</p>
            )}
          </div>

          {/* Answer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer *
            </label>
            <textarea
              value={formData.back}
              onChange={(e) => handleInputChange('back', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.back ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={4}
              placeholder="Enter the detailed answer..."
            />
            {errors.back && (
              <p className="mt-1 text-sm text-red-600">{errors.back}</p>
            )}
          </div>

          {/* Category and Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., heart, circulation, blood pressure"
            />
            <p className="mt-1 text-sm text-gray-500">
              Add relevant tags to help organize your flashcards
            </p>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
            <div className="space-y-2">
              <div>
                <span className="text-xs text-gray-500">Question:</span>
                <p className="text-sm text-gray-900">{formData.front || 'Your question will appear here...'}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Answer:</span>
                <p className="text-sm text-gray-900">{formData.back || 'Your answer will appear here...'}</p>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  formData.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  formData.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {formData.difficulty}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  {formData.category}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Flashcard
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default FlashcardCreator;
