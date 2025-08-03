import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  Heart,
  Activity,
  BookOpen,
  Target,
  TrendingUp,
  Clock,
  Calendar,
  ChevronRight,
  Play,
  Zap,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStudyStore, useStudyProgress, useStudyStreak } from '../stores/studyStore';
import { useQuery } from '@tanstack/react-query';
import { studyAPI } from '../services/api.service';
import ProgressChart from '../components/Study/ProgressChart';
import StudyStreak from '../components/Study/StudyStreak';
import QuickActions from '../components/Dashboard/QuickActions';
import RecentActivity from '../components/Dashboard/RecentActivity';
import UpcomingGoals from '../components/Dashboard/UpcomingGoals';
import { formatDistanceToNow } from 'date-fns';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const progress = useStudyProgress();
  const streak = useStudyStreak();
  const { startSession, getRecommendedTopics } = useStudyStore();
  
  const [greeting, setGreeting] = useState('');

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => studyAPI.getStudyStats('week'),
  });

  // Fetch recent activity
  const { data: recentActivity } = useQuery({
    queryKey: ['recentActivity'],
    queryFn: () => studyAPI.getRecentActivity(),
  });

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const quickStartStudy = (tool: string, topic?: string) => {
    if (topic) {
      startSession(topic);
    }
    navigate(`/study/${tool}${topic ? `/${topic}` : ''}`);
  };

  const recommendedTopics = getRecommendedTopics();
  const overallAccuracy = progress.totalQuestions > 0
    ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100)
    : 0;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {greeting}, {user?.name}!
          </h1>
          <p className="text-gray-600">
            {streak > 0
              ? `You're on a ${streak} day streak! Keep it up! 🔥`
              : "Ready to start your study journey today?"}
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="stat-card gradient-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Study Streak</p>
                <p className="text-3xl font-bold text-white">{streak}</p>
                <p className="text-white/60 text-xs">days</p>
              </div>
              <Zap className="w-8 h-8 text-white/40" />
            </div>
          </div>

          <div className="stat-card gradient-success">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Accuracy</p>
                <p className="text-3xl font-bold text-white">{overallAccuracy}%</p>
                <p className="text-white/60 text-xs">overall</p>
              </div>
              <Target className="w-8 h-8 text-white/40" />
            </div>
          </div>

          <div className="stat-card gradient-info">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Questions</p>
                <p className="text-3xl font-bold text-white">{progress.totalQuestions}</p>
                <p className="text-white/60 text-xs">answered</p>
              </div>
              <BookOpen className="w-8 h-8 text-white/40" />
            </div>
          </div>

          <div className="stat-card gradient-warning">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Study Time</p>
                <p className="text-3xl font-bold text-white">
                  {Math.round((stats?.totalTime || 0) / 60)}
                </p>
                <p className="text-white/60 text-xs">hours this week</p>
              </div>
              <Clock className="w-8 h-8 text-white/40" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-content">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <Link to="/progress" className="text-blue-600 text-sm hover:underline">
                  View All →
                </Link>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  {recentActivity && recentActivity.length > 0 ? (
                    recentActivity.slice(0, 5).map((activity: any, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          ${activity.type === 'quiz' ? 'bg-purple-100' : 
                            activity.type === 'flashcard' ? 'bg-green-100' : 
                            'bg-blue-100'}
                        `}>
                          {activity.type === 'quiz' ? <Target className="w-4 h-4 text-purple-600" /> :
                           activity.type === 'flashcard' ? <Activity className="w-4 h-4 text-green-600" /> :
                           <Brain className="w-4 h-4 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-4">
                      No recent activity. Start studying to see your progress!
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Upcoming Goals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <UpcomingGoals />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Achievement Toast */}
      {progress.totalQuestions > 0 && progress.totalQuestions % 100 === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8" />
            <div>
              <h3 className="font-bold">Milestone Reached!</h3>
              <p className="text-sm">{progress.totalQuestions} questions answered!</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
            >
              <div className="card-header">
                <h2 className="text-xl font-semibold">Quick Start</h2>
                <p className="text-gray-600 text-sm">Jump back into your studies</p>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => quickStartStudy('anatomy', 'brain')}
                    className="quick-action-btn"
                  >
                    <Brain className="w-8 h-8 mb-2 text-blue-600" />
                    <h3 className="font-semibold">3D Anatomy</h3>
                    <p className="text-sm text-gray-600">Explore brain model</p>
                  </button>

                  <button
                    onClick={() => quickStartStudy('flashcards', recommendedTopics[0])}
                    className="quick-action-btn"
                  >
                    <Activity className="w-8 h-8 mb-2 text-green-600" />
                    <h3 className="font-semibold">Flashcards</h3>
                    <p className="text-sm text-gray-600">Review {recommendedTopics[0] || 'cards'}</p>
                  </button>

                  <button
                    onClick={() => quickStartStudy('quiz', 'practice')}
                    className="quick-action-btn"
                  >
                    <Target className="w-8 h-8 mb-2 text-purple-600" />
                    <h3 className="font-semibold">Practice Quiz</h3>
                    <p className="text-sm text-gray-600">Test your knowledge</p>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Progress Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <div className="card-header">
                <h2 className="text-xl font-semibold">Weekly Progress</h2>
                <Link to="/progress" className="text-blue-600 text-sm hover:underline">
                  View Details →
                </Link>
              </div>
              <div className="card-body">
                {statsLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="loading-spinner" />
                  </div>
                ) : (
                  <ProgressChart data={stats?.dailyStats || []} />
                )}
              </div>
            </motion.div>

            {/* System Mastery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <div className="card-header">
                <h2 className="text-xl font-semibold">System Mastery</h2>
                <p className="text-gray-600 text-sm">Your progress by topic</p>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  {Object.entries(progress.topicsMastery).map(([topic, data]) => {
                    const mastery = data.total > 0 ? (data.correct / data.total) * 100 : 0;
                    return (
                      <div key={topic} className="mastery-item">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium capitalize">{topic}</span>
                          <span className="text-sm text-gray-600">{Math.round(mastery)}%</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${mastery}%`,
                              backgroundColor: mastery >= 80 ? '#10b981' : mastery >= 60 ? '#3b82f6' : '#f59e0b'
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Study Streak */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StudyStreak />
            </motion.div>

            {/* Recommended Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <div className="card-header">
                <h2 className="text-lg font-semibold">Focus Areas</h2>
                <p className="text-gray-600 text-sm">Topics that need attention</p>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  {recommendedTopics.length > 0 ? (
                    recommendedTopics.map((topic, index) => (
                      <Link
                        key={topic}
                        to={`/study/flashcards/${topic}`}
                        className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium capitalize">{topic}</h3>
                            <p className="text-sm text-gray-600">
                              Mastery: {Math.round((progress.topicsMastery[topic]?.correct / 
                                progress.topicsMastery[topic]?.total || 0) * 100)}%
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-4">
                      Great job! All topics are well covered.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
