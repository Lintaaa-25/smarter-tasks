import React from 'react';

const Dashboard: React.FC = () => {
  const storedUser = localStorage.getItem('userData');
  const userData = storedUser ? JSON.parse(storedUser) : null;

  if (!userData) {
    return <div>No user data found. Please sign in again.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Dashboard</h1>
      <p className="mb-2">Welcome, <strong>{userData.name}</strong></p>
      <p className="mb-4">Email: {userData.email}</p>
      <button
        id="logout-link"
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          window.location.href = '/signin';  // redirect after logout
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
