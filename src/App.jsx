import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  // Load from localStorage or start empty
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('todos') || '[]');
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');

  // Persist on change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos([{ id: Date.now(), text }, ...todos]);
    setInput('');
  };

  const removeTodo = id => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <h1>My To-Do List</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="What needs doing…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo} disabled={!input.trim()}>
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="empty">No tasks yet—add one above!</p>
      ) : (
        <ul className="todo-list">
          {todos.map(({ id, text }) => (
            <li key={id} className="todo-item">
              <span>{text}</span>
              <button onClick={() => removeTodo(id)} aria-label="Remove">
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
