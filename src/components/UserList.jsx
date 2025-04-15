// src/components/UserList.jsx
import React, { useState } from 'react';
import UserCard from './UserCard';
import '../styles.css';

const UserList = ({ users, onViewProfile, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All Users');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === 'All Users' ||
      (filter === 'Active Users' && user.isActive) ||
      (filter === 'Inactive Users' && !user.isActive);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="UserList-container">
      <div className="UserList-filters">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="UserList-search"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="UserList-dropdown"
        >
          <option>All Users</option>
          <option>Active Users</option>
          <option>Inactive Users</option>
        </select>
      </div>
      {filteredUsers.length === 0 ? (
        <p className="UserList-noUsers">No users match the current filters.</p>
      ) : (
        filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onViewProfile={onViewProfile}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default UserList;