import { useState, useEffect } from 'react';
import { getCourses, enrollInCourse } from '../../api/studentApi';
import { useNavigate } from 'react-router-dom';

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [enrolling, setEnrolling] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [page]);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getCourses(page, 12);
      if (response.success) {
        setCourses(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setCourses([]);
      }
    } catch (err) {
      setError('Failed to fetch courses');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!window.confirm('Do you want to enroll in this course?')) return;

    setEnrolling(courseId);
    try {
      const response = await enrollInCourse(courseId);
      if (response.success) {
        alert('Enrolled successfully!');
        navigate('/student/my-enrollments');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to enroll in course');
    } finally {
      setEnrolling(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Courses</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {courses.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600">No courses available at the moment</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="card hover:shadow-md transition-shadow">
                <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">📖</span>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Instructor:</span>
                    <span className="text-gray-900">{course.instructorName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="text-gray-900">{course.categoryName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Students:</span>
                    <span className="text-gray-900">{course.enrolledStudents || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Price:</span>
                    <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleEnroll(course.id)}
                  className="btn-primary w-full"
                  disabled={enrolling === course.id}
                >
                  {enrolling === course.id ? 'Enrolling...' : 'Enroll Now'}
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="btn-secondary"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BrowseCourses;
