import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, hasRole } = useAuth();
  const location = useLocation();
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const adminLinks = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Manage Users', icon: '👥' },
    { path: '/admin/courses', label: 'All Courses', icon: '📚' },
    { path: '/admin/pending-courses', label: 'Pending Courses', icon: '📋' }
  ];

  const instructorLinks = [
    { path: '/instructor', label: 'Dashboard', icon: '📊' },
    { path: '/instructor/create-course', label: 'Create Course', icon: '➕' },
    { path: '/instructor/my-courses', label: 'My Courses', icon: '📚' }
  ];

  const mentorLinks = [
    { path: '/mentor', label: 'Dashboard', icon: '📊' },
    { path: '/mentor/queries', label: 'Student Queries', icon: '💬' }
  ];

  const studentLinks = [
    { path: '/student', label: 'Dashboard', icon: '📊' },
    { path: '/student/browse-courses', label: 'Browse Courses', icon: '🔍' },
    { path: '/student/my-enrollments', label: 'My Enrollments', icon: '📚' },
    { path: '/student/my-queries', label: 'My Queries', icon: '💬' },
    { path: '/student/ask-query', label: 'Ask Query', icon: '❓' }
  ];

  let links = [];
  if (hasRole('ADMIN')) links = adminLinks;
  else if (hasRole('INSTRUCTOR')) links = instructorLinks;
  else if (hasRole('MENTOR')) links = mentorLinks;
  else if (hasRole('STUDENT')) links = studentLinks;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 w-64 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-600">LMS</h1>
            <p className="text-xs text-gray-600 mt-1">{user?.roles?.[0] || 'User'}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.username}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
