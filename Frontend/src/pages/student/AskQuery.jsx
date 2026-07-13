import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitQuery, getMyEnrollments } from '../../api/studentApi';

const AskQuery = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: ''
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await getMyEnrollments(0, 50);
      if (response.success) {
        setCourses(response.data.content || []);
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitQuery({
        ...formData,
        courseId: parseInt(formData.courseId)
      });
      alert('Query submitted successfully! A mentor will respond soon.');
      navigate('/student/my-queries');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Ask a Question</h1>

      <div className="max-w-2xl">
        <div className="card">
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Be specific with your question. Include details about what you've tried and where you're stuck.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course *
              </label>
              <select
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                className="input-field"
                required
                disabled={loading}
              >
                <option value="">Select a course</option>
                {courses.map((enrollment) => (
                  <option key={enrollment.courseId} value={enrollment.courseId}>
                    {enrollment.courseName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="Brief summary of your question"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Question *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field"
                rows={6}
                placeholder="Explain your question in detail..."
                required
                disabled={loading}
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Question'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/student')}
                className="btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuery;
