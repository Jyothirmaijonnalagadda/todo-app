import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('Todo');
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("tasks"));
  if (saved) setTasks(saved);
}, []);
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
<p style={{ color: "#6c757d", marginBottom: "10px" }}>
  Organize your day with simple tasks ✍️
</p>


  const addOrUpdateTask = () => {
    if (taskName.trim() === '') return;
    const newTask = { name: taskName, status };

    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex] = newTask;
      setTasks(updated);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    setTaskName('');
    setStatus('Todo');
  };

  const editTask = (index) => {
    setTaskName(tasks[index].name);
    setStatus(tasks[index].status);
    setEditingIndex(index);
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  return (
    <div className="App">
      <h2>TODO List Demo App</h2>
      <div className="form">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Todo</option>
          <option>In Progress</option>
          <option>Complete</option>
        </select>
        <button onClick={addOrUpdateTask}>
          {editingIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Task Name</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{t.name}</td>
              <td>
                <span className={`badge ${t.status.replace(' ', '').toLowerCase()}`}>
                  {t.status}
                </span>
              </td>
              <td>
                <button onClick={() => editTask(i)} className="edit">✏️</button>
              </td>
              <td>
                <button onClick={() => deleteTask(i)} className="delete">🗑️</button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
      {tasks.length > 0 && (
  <button
    onClick={() => setTasks([])}
    style={{
      backgroundColor: "#6c757d",
      color: "white",
      marginTop: "15px",
      padding: "8px 12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }}
  >
    Clear All Tasks
  </button>
)}

    </div>
  );
}

export default App;
