// Utility to clean up invalid tokens
export const cleanupAuth = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  // Remove invalid tokens
  if (token === 'null' || token === 'undefined' || token === '') {
    localStorage.removeItem('token');
  }
  
  if (user === 'null' || user === 'undefined' || user === '') {
    localStorage.removeItem('user');
  }
};

// Call cleanup on app start
cleanupAuth();