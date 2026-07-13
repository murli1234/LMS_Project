import { useEffect, useRef, useState } from 'react';
import { getDashboardStats } from '../../api/adminApi';
import gsap from 'gsap';

const AdminDashboard = () => {
  const statsRef = useRef(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    pendingCourses: 0,
    totalQueries: 0,
    totalStudents: 0,
    totalInstructors: 0,
    totalMentors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
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

  const fetchDashboardStats = async () => {
    try {
      const response = await getDashboardStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    { label: 'Total Users', value: stats.totalUsers, color: 'border-blue-500', icon: '👥' },
    { label: 'Total Courses', value: stats.totalCourses, color: 'border-green-500', icon: '📚' },
    { label: 'Pending Approvals', value: stats.pendingCourses, color: 'border-yellow-500', icon: '⏳' },
    { label: 'Total Queries', value: stats.totalQueries, color: 'border-purple-500', icon: '❓' }
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Users by Role</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Students</span>
              <span className="font-medium">{stats.totalStudents}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Instructors</span>
              <span className="font-medium">{stats.totalInstructors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mentors</span>
              <span className="font-medium">{stats.totalMentors}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Server Load</span>
                <span className="text-gray-900 font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Database Usage</span>
                <span className="text-gray-900 font-medium">72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full text-left p-2 text-sm bg-blue-50 hover:bg-blue-100 rounded">
              View All Users
            </button>
            <button className="w-full text-left p-2 text-sm bg-green-50 hover:bg-green-100 rounded">
              Pending Courses
            </button>
            <button className="w-full text-left p-2 text-sm bg-yellow-50 hover:bg-yellow-100 rounded">
              System Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
