import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoBack = () => {
    if (user) {
      // Redirect to user's appropriate dashboard
      if (user.roles.includes('ADMIN')) {
        navigate('/admin');
      } else if (user.roles.includes('INSTRUCTOR')) {
        navigate('/instructor');
      } else if (user.roles.includes('MENTOR')) {
        navigate('/mentor');
      } else if (user.roles.includes('STUDENT')) {
        navigate('/student');
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <button
          onClick={handleGoBack}
          className="btn-primary"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
