import { useEffect, useRef, useState } from 'react';
import { getMyEnrollments } from '../../api/studentApi';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const statsRef = useRef(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  useEffect(() => {
    if (statsRef.current && !loading) {
      const cards = statsRef.current.children;
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [loading]);

  const fetchEnrollments = async () => {
    try {
      const response = await getMyEnrollments(0, 5);
      if (response.success) {
        setEnrollments(response.data.content || []);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Enrolled Courses', value: enrollments.length, color: 'border-blue-500', icon: '📚' },
    { label: 'Completed', value: enrollments.filter(e => e.progress === 100).length, color: 'border-green-500', icon: '✅' },
    { label: 'In Progress', value: enrollments.filter(e => e.progress > 0 && e.progress < 100).length, color: 'border-yellow-500', icon: '⏳' },
    { label: 'Not Started', value: enrollments.filter(e => e.progress === 0).length, color: 'border-gray-500', icon: '📖' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Dashboard</h1>

      <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Link to="/student/browse-courses" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-center py-6">
            <div className="text-5xl mb-3">🔍</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Browse Courses</h2>
            <p className="text-sm text-gray-600">Explore new courses</p>
          </div>
        </Link>

        <Link to="/student/my-enrollments" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-center py-6">
            <div className="text-5xl mb-3">📚</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">My Enrollments</h2>
            <p className="text-sm text-gray-600">Continue learning</p>
          </div>
        </Link>

        <Link to="/student/ask-query" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-center py-6">
            <div className="text-5xl mb-3">❓</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Ask Question</h2>
            <p className="text-sm text-gray-600">Get help from mentors</p>
          </div>
        </Link>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Courses</h2>
        {enrollments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-600 mb-4">No courses enrolled yet</p>
            <Link to="/student/browse-courses" className="btn-primary">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {enrollments.slice(0, 3).map((enrollment) => (
              <div key={enrollment.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {enrollment.courseName?.charAt(0) || 'C'}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">{enrollment.courseName}</h3>
                  <p className="text-xs text-gray-600 mb-2">Progress: {enrollment.progress || 0}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${enrollment.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
