// src/components/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import UserProfile from './UserProfile';
import '../styles.css';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState('list');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Load users from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers([
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=JohnDoe',
          role: 'Admin',
          isActive: true,
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=JaneSmith',
          role: 'User',
          isActive: false,
        },
      ]);
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const handleAddEditUser = (userData) => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...userData } : user
        )
      );
    } else {
      const newUserId = Date.now().toString();
      const newUser = {
        id: newUserId,
        avatar: userData.avatar || `https://api.dicebear.com/9.x/pixel-art/svg?seed=${newUserId}`,
        ...userData,
      };
      setUsers([...users, newUser]);
    }
    setEditingUser(null);
    setView('list');
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setDeleteConfirm(null);
    setView('list');
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setView('profile');
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setView('form');
  };

  return (
    <div className="UserDashboard-dashboard">
      <h1>User Dashboard</h1>
      {view === 'list' && (
        <>
          <button
            onClick={() => {
              setEditingUser(null);
              setView('form');
            }}
            className="UserDashboard-addButton"
          >
            Add New User
          </button>
          <UserList
            users={users}
            onViewProfile={handleViewProfile}
            onEdit={handleEditUser}
            onDelete={(id) => setDeleteConfirm(id)}
          />
        </>
      )}
      {view === 'form' && (
        <UserForm
          initialData={editingUser || undefined}
          onSubmit={handleAddEditUser}
          onCancel={() => {
            setEditingUser(null);
            setView('list');
          }}
        />
      )}
      {view === 'profile' && selectedUser && (
        <>
          <UserProfile
            user={selectedUser}
            onEdit={handleEditUser}
            onBack={() => setView('list')}
          />
          <button
            onClick={() => setDeleteConfirm(selectedUser.id)}
            className="UserDashboard-deleteButton"
          >
            Delete User
          </button>
        </>
      )}
      {deleteConfirm && (
        <div className="UserDashboard-modal">
          <div className="UserDashboard-modalContent">
            <p>Are you sure you want to delete this user?</p>
            <button
              onClick={() => handleDeleteUser(deleteConfirm)}
              className="UserDashboard-confirm"
            >
              Yes
            </button>
            <button
              onClick={() => setDeleteConfirm(null)}
              className="UserDashboard-cancel"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;