import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/signin');
  };

  // Get userData from localStorage and parse it
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>

      {userData ? (
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold">Name: {userData.name || userData.user_name || 'N/A'}</p>
          <p className="text-lg font-semibold">Email: {userData.email || 'N/A'}</p>
        </div>
      ) : (
        <p className="mb-6 text-gray-500">User information not available.</p>
      )}

      <button
        id="logout-link"  // <-- important for milestone
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
