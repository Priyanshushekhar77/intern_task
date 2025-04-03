import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState(false);

  if (!user) {
    return <div className="container mt-4">Loading user profile...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      <div className="card">
        <div className="card-header">Profile Information</div>
        <div className="card-body">
          <div className="mb-3">
            <strong>Name:</strong> {user.name}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="mb-3">
            <strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Show More Details'}
          </button>
          
          {showDetails && (
            <div className="mt-3">
              <div className="alert alert-info">
                <p>User ID: {user._id}</p>
                <p>This is a basic profile page. In a production application, you would be able to update your profile information here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
