// src/components/UserCard.jsx
import React from 'react';
import '../styles.css';

const UserCard = ({ user, onViewProfile, onEdit, onDelete }) => {
  return (
    <div className="UserCard-card">
      <img src={user.avatar} alt={user.name} className="UserCard-avatar" />
      <div className="UserCard-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>Role: {user.role}</p>
        <span className={user.isActive ? "UserCard-active" : "UserCard-inactive"}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      <div className="UserCard-actions">
        <button onClick={() => onViewProfile(user)} className="UserCard-button UserCard-view">
          View
        </button>
        <button onClick={() => onEdit(user)} className="UserCard-button UserCard-edit">
          Edit
        </button>
        <button onClick={() => onDelete(user.id)} className="UserCard-button UserCard-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;