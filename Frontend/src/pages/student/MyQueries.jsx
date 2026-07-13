import { useState, useEffect } from 'react';
import { getMyQueries } from '../../api/studentApi';
import { Link } from 'react-router-dom';

const MyQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchQueries();
  }, [page]);

  const fetchQueries = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getMyQueries(page, 10);
      if (response.success) {
        setQueries(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setQueries([]);
      }
    } catch (err) {
      setError('Failed to fetch queries');
      setQueries([]);
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
        <h1 className="text-3xl font-bold text-gray-900">My Queries</h1>
        <Link to="/student/ask-query" className="btn-primary">
          Ask New Question
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {queries.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-gray-600 mb-4">You haven't asked any questions yet</p>
          <Link to="/student/ask-query" className="btn-primary">
            Ask Your First Question
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {queries.map((query) => (
              <div key={query.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{query.title}</h3>
                    <p className="text-sm text-gray-600">
                      Course: {query.courseName} | {new Date(query.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs ${
                    query.status === 'RESOLVED'
                      ? 'bg-green-100 text-green-800'
                      : query.status === 'ANSWERED'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {query.status}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{query.description}</p>

                {query.replies && query.replies.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Replies:</h4>
                    {query.replies.map((reply, index) => (
                      <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          {reply.userName} ({reply.userRole}):
                        </p>
                        <p className="text-sm text-blue-800">{reply.message}</p>
                        <p className="text-xs text-blue-600 mt-1">
                          {new Date(reply.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {(!query.replies || query.replies.length === 0) && query.status === 'OPEN' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      ⏳ Waiting for mentor response...
                    </p>
                  </div>
                )}
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

export default MyQueries;
