import { useEffect, useRef, useState } from 'react';
import { getQueries } from '../../api/mentorApi';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const MentorDashboard = () => {
  const statsRef = useRef(null);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQueries();
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

  const fetchQueries = async () => {
    try {
      const response = await getQueries(0, 20);
      if (response.success) {
        setQueries(response.data.content || []);
      }
    } catch (error) {
      console.error('Error fetching queries:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalQueries = queries.length;
  const pendingQueries = queries.filter(q => q.status === 'OPEN').length;
  const inProgressQueries = queries.filter(q => q.status === 'IN_PROGRESS').length;
  const resolvedQueries = queries.filter(q => q.status === 'RESOLVED').length;

  const stats = [
    { label: 'Total Queries', value: totalQueries, color: 'border-blue-500', icon: '💬' },
    { label: 'Pending', value: pendingQueries, color: 'border-yellow-500', icon: '⏳' },
    { label: 'In Progress', value: inProgressQueries, color: 'border-orange-500', icon: '🔄' },
    { label: 'Resolved', value: resolvedQueries, color: 'border-green-500', icon: '✅' }
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentor Dashboard</h1>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Link to="/mentor/queries" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">View Student Queries</h2>
            <p className="text-gray-600">Respond to student questions and help them learn</p>
          </div>
        </Link>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Queries</h2>
          {queries.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-gray-600">No queries assigned yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {queries.slice(0, 4).map((query) => (
                <div key={query.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">{query.studentName?.charAt(0) || 'S'}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{query.title}</p>
                    <p className="text-xs text-gray-500">
                      {query.studentName} • {query.courseName}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    query.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                    query.status === 'IN_PROGRESS' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {query.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;