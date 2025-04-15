// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoApp from './components/TodoApp';
import UserForm from './components/UserForm';
import UserProfile from './components/UserProfile';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  const handleAddUser = async (values) => {
    // Simulate adding a user (JSONPlaceholder doesn't actually save)
    console.log('Adding user:', values);
    // Navigate back to home (you can adjust this based on your needs)
    window.location.href = '/';
  };

  const handleEditUser = async (values) => {
    // Simulate editing a user (JSONPlaceholder doesn't actually save)
    console.log('Editing user:', values);
    // Navigate back to home (you can adjust this based on your needs)
    window.location.href = '/';
  };

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<TodoApp />} />
              <Route
                path="/add"
                element={<UserForm onSubmit={handleAddUser} />}
              />
              <Route
                path="/edit/:id"
                element={<UserForm onSubmit={handleEditUser} />}
              />
              <Route path="/user/:id" element={<UserProfile />} />
            </Routes>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;