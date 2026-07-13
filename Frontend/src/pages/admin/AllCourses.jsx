import { useState, useEffect } from 'react';
import { getAllCourses, approveCourse, rejectCourse, deleteCourse, getCourseEnrollments } from '../../api/adminApi';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [showEnrollments, setShowEnrollments] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [page]);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getAllCourses(page, 10);
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

  const handleRejectCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to reject this course?')) return;
    
    try {
      const response = await rejectCourse(courseId);
      if (response.success) {
        fetchCourses();
        alert('Course rejected successfully!');
      }
    } catch (err) {
      alert('Failed to reject course');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
    
    try {
      const response = await deleteCourse(courseId);
      if (response.success) {
        fetchCourses();
        alert('Course deleted successfully!');
      }
    } catch (err) {
      alert('Failed to delete course');
    }
  };

  const handleViewEnrollments = async (course) => {
    try {
      const response = await getCourseEnrollments(course.id, 0, 50);
      if (response.success) {
        setSelectedCourse(course);
        setEnrollments(response.data.content || []);
        setShowEnrollments(true);
      }
    } catch (err) {
      alert('Failed to fetch enrollments');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Courses</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {courses.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600">No courses found</p>
        </div>
      ) : (
        <>
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Course</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Instructor</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Students</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Revenue</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{course.title}</p>
                          <p className="text-xs text-gray-500">{course.categoryName}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{course.instructorName}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">${course.price}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{course.enrolledStudents || 0}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-semibold">
                        ${((course.enrolledStudents || 0) * (course.price || 0)).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          course.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          course.status === 'PENDING_APPROVAL' ? 'bg-yellow-100 text-yellow-800' :
                          course.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          {course.status === 'PENDING_APPROVAL' && (
                            <>
                              <button
                                onClick={() => handleApproveCourse(course.id)}
                                className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectCourse(course.id)}
                                className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleViewEnrollments(course)}
                            className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                          >
                            Students
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
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
          </div>
        </>
      )}
      
      {/* Enrollments Modal */}
      {showEnrollments && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Students Enrolled in "{selectedCourse?.title}"
                </h2>
                <button
                  onClick={() => setShowEnrollments(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto">
              {enrollments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No students enrolled yet</p>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enrollments.map((enrollment) => (
                      <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {enrollment.studentName?.charAt(0) || 'S'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{enrollment.studentName}</p>
                            <p className="text-sm text-gray-500">{enrollment.studentEmail}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress:</span>
                            <span className="font-medium">{enrollment.progress || 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${enrollment.progress || 0}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Enrolled:</span>
                            <span className="text-gray-900">{new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{enrollments.length}</p>
                        <p className="text-sm text-gray-600">Total Students</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">
                          ${(enrollments.length * (selectedCourse?.price || 0)).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-yellow-600">
                          {enrollments.filter(e => (e.progress || 0) > 0 && (e.progress || 0) < 100).length}
                        </p>
                        <p className="text-sm text-gray-600">In Progress</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">
                          {enrollments.filter(e => (e.progress || 0) === 100).length}
                        </p>
                        <p className="text-sm text-gray-600">Completed</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCourses;