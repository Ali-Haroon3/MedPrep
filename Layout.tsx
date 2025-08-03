import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Home,
  BookOpen,
  Activity,
  BarChart3,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  User,
  LogOut,
  HelpCircle,
  Crown,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import NotificationDropdown from '../components/Layout/NotificationDropdown';
import SearchModal from '../components/Layout/SearchModal';
import { useHotkeys } from '../hooks/useHotkeys';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems: NavItem[] = [
    { path: '/', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { path: '/anatomy', label: '3D Anatomy', icon: <Brain className="w-5 h-5" /> },
    { path: '/study', label: 'Study Tools', icon: <BookOpen className="w-5 h-5" /> },
    { path: '/progress', label: 'Progress', icon: <BarChart3 className="w-5 h-5" /> },
    { path: '/resources', label: 'Resources', icon: <Activity className="w-5 h-5" /> },
  ];

  // Keyboard shortcuts
  useHotkeys('cmd+k', () => setSearchOpen(true));
  useHotkeys('cmd+/', () => navigate('/help'));
  useHotkeys('cmd+,', () => navigate('/settings'));

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`app-layout ${theme}`}>
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25 }}
            className="sidebar"
          >
            {/* Logo */}
            <div className="sidebar-header">
              <Link to="/" className="logo-link">
                <Brain className="w-8 h-8 text-blue-600" />
                <span className="logo-text">NeuroPrep</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActivePath(item.path) ? 'active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {isActivePath(item.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="active-indicator"
                      transition={{ type: 'spring', damping: 25 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Premium Upgrade */}
            {user?.role === 'student' && (
              <div className="sidebar-premium">
                <div className="premium-card">
                  <Crown className="w-6 h-6 text-yellow-500 mb-2" />
                  <h3 className="font-semibold mb-1">Upgrade to Premium</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Unlock all features and content
                  </p>
                  <Link to="/upgrade" className="btn btn-primary btn-sm w-full">
                    Upgrade Now
                  </Link>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="sidebar-footer">
              <Link to="/settings" className="nav-link">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              <Link to="/help" className="nav-link">
                <HelpCircle className="w-5 h-5" />
                <span>Help & Support</span>
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Header */}
        <header className="app-header">
          <div className="header-left">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="sidebar-toggle desktop-only"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sidebar-toggle mobile-only"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="search-trigger"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
              <span className="desktop-only">Search</span>
              <kbd className="search-shortcut desktop-only">⌘K</kbd>
            </button>
          </div>

          <div className="header-right">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="header-btn"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <NotificationDropdown />

            {/* Profile Dropdown */}
            <div className="profile-dropdown">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="profile-trigger"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="desktop-only">{user?.name}</span>
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="dropdown-menu profile-menu"
                  >
                    <Link to="/profile" className="dropdown-item">
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link to="/settings" className="dropdown-item">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <hr className="dropdown-divider" />
                    <button onClick={logout} className="dropdown-item text-red-600">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-menu-overlay"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="mobile-menu"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <Link to="/" className="logo-link">
                  <Brain className="w-8 h-8 text-blue-600" />
                  <span className="logo-text">NeuroPrep</span>
                </Link>
              </div>

              <nav className="mobile-nav">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`mobile-nav-link ${isActivePath(item.path) ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="mobile-menu-footer">
                <Link to="/settings" className="mobile-nav-link">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
                <button onClick={logout} className="mobile-nav-link text-red-600">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default Layout;
