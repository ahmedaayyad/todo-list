// src/components/TodoApp.jsx
import React from 'react';
import useFetch from '../hooks/useFetch';
import useForm from '../hooks/useForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import UserDashboard from './UserDashboard';

const validateTodo = (values) => {
  const errors = {};
  if (!values.task) errors.task = 'Task is required';
  return errors;
};

const validateLogin = (values) => {
  const errors = {};
  if (!values.username) errors.username = 'Username is required';
  if (!values.password) errors.password = 'Password is required';
  return errors;
};

const TodoApp = () => {
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [todos, setTodos] = useLocalStorage('todos', []);
  const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  const { values: todoValues, errors: todoErrors, touched: todoTouched, handleChange: handleTodoChange, handleSubmit: handleTodoSubmit, isSubmitting: isTodoSubmitting } = useForm(
    { task: '' },
    validateTodo
  );
  const { values: loginValues, errors: loginErrors, touched: loginTouched, handleChange: handleLoginChange, handleSubmit: handleLoginSubmit, isSubmitting: isLoginSubmitting } = useForm(
    { username: '', password: '' },
    validateLogin
  );
  const [loginError, setLoginError] = React.useState(null);

  // Load initial todos from API
  React.useEffect(() => {
    if (data && todos.length === 0) {
      setTodos(data.map((todo) => ({ id: todo.id, task: todo.title, completed: todo.completed })));
    }
  }, [data, todos, setTodos]);

  const addTodo = (values) => {
    setTodos([...todos, { id: Date.now(), task: values.task, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleLogin = async (values) => {
    const success = login(values.username, values.password);
    if (!success) {
      setLoginError('Invalid username or password');
    }
  };

  if (!user) {
    return (
      <div className="TodoApp-login">
        <h2>Login to Access Todo App</h2>
        <form onSubmit={(e) => handleLoginSubmit(e, handleLogin)} className="TodoApp-form">
          <div className="TodoApp-form-field">
            <input
              type="text"
              name="username"
              value={loginValues.username}
              onChange={handleLoginChange}
              placeholder="Username"
              className="TodoApp-input"
            />
            {loginTouched.username && loginErrors.username && (
              <div className="TodoApp-error">{loginErrors.username}</div>
            )}
          </div>
          <div className="TodoApp-form-field">
            <input
              type="password"
              name="password"
              value={loginValues.password}
              onChange={handleLoginChange}
              placeholder="Password"
              className="TodoApp-input"
            />
            {loginTouched.password && loginErrors.password && (
              <div className="TodoApp-error">{loginErrors.password}</div>
            )}
          </div>
          {loginError && <div className="TodoApp-error">{loginError}</div>}
          <button
            type="submit"
            disabled={isLoginSubmitting}
            className="TodoApp-button TodoApp-login-button"
          >
            {isLoginSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={`TodoApp-container ${theme}`}>
      <div className="TodoApp-header">
        <h1>Todo App</h1>
        <div className="TodoApp-controls">
          <button
            onClick={toggleTheme}
            className="TodoApp-button TodoApp-theme-button"
            style={{
              background: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#fff' : '#333',
            }}
          >
            Toggle Theme ({theme})
          </button>
          <button
            onClick={logout}
            className="TodoApp-button TodoApp-logout-button"
          >
            Log Out ({user.username})
          </button>
        </div>
      </div>

      <form
        onSubmit={(e) => handleTodoSubmit(e, addTodo)}
        className="TodoApp-form"
      >
        <div className="TodoApp-form-field">
          <input
            type="text"
            name="task"
            value={todoValues.task}
            onChange={handleTodoChange}
            placeholder="Add a new task"
            className="TodoApp-input"
          />
          {todoTouched.task && todoErrors.task && (
            <span className="TodoApp-error">{todoErrors.task}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={isTodoSubmitting}
          className="TodoApp-button TodoApp-submit-button"
        >
          {isTodoSubmitting ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      {loading && <div className="TodoApp-loading">Loading todos...</div>}
      {error && <div className="TodoApp-error">Error: {error.message}</div>}

      <div className="TodoApp-todo-list">
        {todos.length === 0 && !loading && !error && (
          <p className="TodoApp-no-todos">No todos yet. Add one!</p>
        )}
        {todos.map((todo) => (
          <div key={todo.id} className="TodoApp-todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="TodoApp-todo-checkbox"
            />
            <span
              className={`TodoApp-todo-text ${
                todo.completed ? 'completed' : ''
              }`}
            >
              {todo.task}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="TodoApp-button TodoApp-delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={refetch}
        className="TodoApp-button TodoApp-refresh-button"
      >
        Refresh Todos from API
      </button>

      <div className="TodoApp-user-section">
        <UserDashboard />
      </div>
    </div>
  );
};

export default TodoApp;