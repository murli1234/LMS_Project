import { useState, useEffect } from 'react';
import { getMyEnrollments } from '../../api/studentApi';
import { Link } from 'react-router-dom';

const MyEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchEnrollments();
  }, [page]);

  const fetchEnrollments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getMyEnrollments(page, 10);
      if (response.success) {
        setEnrollments(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setEnrollments([]);
      }
    } catch (err) {
      setError('Failed to fetch enrollments');
      setEnrollments([]);
    } finally {
      setLoading(false);
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
        <h1 className="text-3xl font-bold text-gray-900">My Enrollments</h1>
        <Link to="/student/browse-courses" className="btn-primary">
          Browse More Courses
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {enrollments.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
          <Link to="/student/browse-courses" className="btn-primary">
            Browse Courses
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="card hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-6xl">📖</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {enrollment.courseName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Instructor: {enrollment.instructorName || 'N/A'}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded text-xs ${
                        enrollment.progress === 100 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {enrollment.progress === 100 ? 'Completed' : 'In Progress'}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-4">{enrollment.courseDescription || 'No description available'}</p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-900 font-medium">{enrollment.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all" 
                          style={{ width: `${enrollment.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="btn-primary">
                        Continue Learning
                      </button>
                      <button className="btn-secondary">
                        View Certificate
                      </button>
                    </div>
                  </div>
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

export default MyEnrollments;
