// src/components/UserProfile.jsx
import React from 'react';
import '../styles.css';

const UserProfile = ({ user, onEdit, onBack }) => {
  return (
    <div className="UserProfile-profile">
      <img src={user.avatar} alt={user.name} className="UserProfile-avatar" />
      <h2>{user.name}</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Status:</strong>{' '}
        <span className={user.isActive ? "UserProfile-active" : "UserProfile-inactive"}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </p>
      <div className="UserProfile-actions">
        <button onClick={() => onEdit(user)} className="UserProfile-edit">
          Edit
        </button>
        <button onClick={onBack} className="UserProfile-back">
          Back to List
        </button>
      </div>
    </div>
  );
};

export default UserProfile;