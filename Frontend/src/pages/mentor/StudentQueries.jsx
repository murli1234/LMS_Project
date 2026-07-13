import { useState, useEffect } from 'react';
import { getQueries, replyToQuery, resolveQuery } from '../../api/mentorApi';

const StudentQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQueries();
  }, [page]);

  const fetchQueries = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getQueries(page, 10);
      setQueries(response.content || response);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      setError('Failed to fetch queries');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (queryId) => {
    if (!replyText.trim()) {
      alert('Please enter a reply');
      return;
    }

    setSubmitting(true);
    try {
      await replyToQuery(queryId, replyText);
      setReplyText('');
      setSelectedQuery(null);
      fetchQueries();
      alert('Reply sent successfully!');
    } catch (err) {
      alert('Failed to send reply');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResolve = async (queryId) => {
    if (!window.confirm('Mark this query as resolved?')) return;

    try {
      await resolveQuery(queryId);
      fetchQueries();
      alert('Query marked as resolved!');
    } catch (err) {
      alert('Failed to resolve query');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Queries</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {queries.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-gray-600">No queries to display</p>
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
                      By: {query.studentName} | Course: {query.courseName}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs ${
                    query.status === 'RESOLVED'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {query.status}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{query.question}</p>

                {query.reply && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-blue-900 mb-1">Your Reply:</p>
                    <p className="text-sm text-blue-800">{query.reply}</p>
                  </div>
                )}

                {selectedQuery === query.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="input-field"
                      rows={3}
                      placeholder="Type your reply..."
                      disabled={submitting}
                    ></textarea>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReply(query.id)}
                        className="btn-primary"
                        disabled={submitting}
                      >
                        {submitting ? 'Sending...' : 'Send Reply'}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedQuery(null);
                          setReplyText('');
                        }}
                        className="btn-secondary"
                        disabled={submitting}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedQuery(query.id)}
                      className="btn-primary"
                    >
                      Reply
                    </button>
                    {query.status !== 'RESOLVED' && (
                      <button
                        onClick={() => handleResolve(query.id)}
                        className="btn-success"
                      >
                        Mark as Resolved
                      </button>
                    )}
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

export default StudentQueries;
