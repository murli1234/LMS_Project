import { useEffect, useRef, useState } from 'react';
import { getMyCourses } from '../../api/instructorApi';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const InstructorDashboard = () => {
  const statsRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
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

  const fetchCourses = async () => {
    try {
      const response = await getMyCourses(0, 10);
      if (response.success) {
        setCourses(response.data.content || []);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalStudents = courses.reduce((sum, course) => sum + (course.enrolledStudents || 0), 0);
  const pendingCourses = courses.filter(course => course.status === 'PENDING_APPROVAL').length;
  const approvedCourses = courses.filter(course => course.status === 'APPROVED').length;

  const stats = [
    { label: 'My Courses', value: courses.length, color: 'border-blue-500', icon: '📚' },
    { label: 'Total Students', value: totalStudents, color: 'border-green-500', icon: '👨‍🎓' },
    { label: 'Pending Approval', value: pendingCourses, color: 'border-yellow-500', icon: '⏳' },
    { label: 'Approved Courses', value: approvedCourses, color: 'border-purple-500', icon: '✅' }
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Instructor Dashboard</h1>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Link to="/instructor/create-course" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">➕</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Create New Course</h2>
            <p className="text-gray-600">Start creating a new course for your students</p>
          </div>
        </Link>

        <Link to="/instructor/my-courses" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">My Courses</h2>
            <p className="text-gray-600">View and manage your existing courses</p>
          </div>
        </Link>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Courses</h2>
        {courses.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-600 mb-4">No courses created yet</p>
            <Link to="/instructor/create-course" className="btn-primary">
              Create Your First Course
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {courses.slice(0, 5).map((course) => (
              <div key={course.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {course.title?.charAt(0) || 'C'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{course.title}</p>
                  <p className="text-xs text-gray-500">
                    {course.enrolledStudents || 0} students • Status: {course.status}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  course.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                  course.status === 'PENDING_APPROVAL' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {course.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
