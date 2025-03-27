// src/components/Profile.js
import React, { useState, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile from backend
    fetch('/api/users/profile')
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    return <div className="error">Failed to load profile</div>;
  }

  return (
    <div className="profile">
      <h1>My Profile</h1>
      
      <div className="profile-card">
        <div className="profile-header">
          <img 
            src={user.avatar || 'https://via.placeholder.com/100'} 
            alt="Profile" 
            className="profile-avatar" 
          />
          <div>
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-role">{user.role}</p>
          </div>
        </div>
        
        <div className="profile-details">
          <p>
            <span>Email:</span>
            <span>{user.email}</span>
          </p>
          <p>
            <span>Phone:</span>
            <span>{user.phone}</span>
          </p>
          <p>
            <span>Address:</span>
            <span>{user.address}</span>
          </p>
          <p>
            <span>Member since:</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </p>
        </div>
        
        <button className="edit-profile-btn">Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;