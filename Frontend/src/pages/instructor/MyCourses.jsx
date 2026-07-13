import { useState, useEffect } from 'react';
import { getMyCourses, deleteCourse, updateCourse, getCourseDetails } from '../../api/instructorApi';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [page]);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getMyCourses(page, 10);
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

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
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

  const handleEditCourse = async (courseId) => {
    try {
      const response = await getCourseDetails(courseId);
      if (response.success) {
        setEditingCourse(response.data);
        setShowEditModal(true);
      }
    } catch (err) {
      alert('Failed to load course details');
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <Link to="/instructor/create-course" className="btn-primary">
          Create New Course
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {courses.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600 mb-4">You haven't created any courses yet</p>
          <Link to="/instructor/create-course" className="btn-primary">
            Create Your First Course
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="card hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      course.status === 'APPROVED' 
                        ? 'bg-green-100 text-green-800' 
                        : course.status === 'PENDING_APPROVAL'
                        ? 'bg-yellow-100 text-yellow-800'
                        : course.status === 'REJECTED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="text-gray-900">{course.categoryName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="text-gray-900 font-semibold">${course.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Students:</span>
                    <span className="text-gray-900">{course.enrolledStudents || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="text-gray-900 font-semibold">${((course.enrolledStudents || 0) * (course.price || 0)).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEditCourse(course.id)}
                    className="btn-secondary flex-1 text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteCourse(course.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
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

export default MyCourses;
