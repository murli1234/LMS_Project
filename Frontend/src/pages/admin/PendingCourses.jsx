import { useState, useEffect } from 'react';
import { getPendingCourses, approveCourse } from '../../api/adminApi';

const PendingCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchCourses();
  }, [page]);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getPendingCourses(page, 10);
      if (response.success) {
        setCourses(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setCourses([]);
      }
    } catch (err) {
      setError('Failed to fetch pending courses');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to approve this course?')) return;
    
    try {
      const response = await approveCourse(courseId);
      if (response.success) {
        fetchCourses();
        alert('Course approved successfully!');
      }
    } catch (err) {
      alert('Failed to approve course');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Pending Course Approvals</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {courses.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600">No pending courses to approve</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="card hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>
                </div>
                
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Instructor:</span>
                    <span className="text-gray-900 font-medium">{course.instructorName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="text-gray-900">{course.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="text-gray-900 font-semibold">${course.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleApproveCourse(course.id)}
                  className="btn-success w-full"
                >
                  Approve Course
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

export default PendingCourses;
