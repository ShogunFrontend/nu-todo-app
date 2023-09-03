import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faTimes,
  faTrash,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const openModal = (defaultTitle = "") => {
    setTaskTitle(defaultTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTaskTitle("");
    setEditingTodoId(null);
    setIsModalOpen(false);
  };

  const handleTaskAction = () => {
    if (editingTodoId) {
      // Edit existing task
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingTodoId ? { ...todo, text: taskTitle } : todo
        )
      );
      setEditingTodoId(null);
    } else {
      // Add new task
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text: taskTitle, completed: false },
      ]);
    }
    setTaskTitle("");
    closeModal();
  };

  return (
    <div className="app">
      <div className="cloud-icon">
        <FontAwesomeIcon icon={faList} size="lg" />
      </div>
      <h1 className="app-title">Membranes To-Do List</h1>
      <div className="add-task-button-container">
        <button className="add-task-button" onClick={() => openModal()}>
          Add To-Do
        </button>
      </div>
      <div className="task-grid">
        {todos.length === 0 ? (
          <p>No To-Dos</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`task-item ${todo.completed ? "completed" : ""}`}
            >
              <div className="task-details">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                <div className="task-details-content">
                  <p>{todo.text}</p>
                  <span className="task-added-time">
                    Added on {new Date(todo.id).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="task-icons">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(todo.id)}
                />
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  onClick={() => {
                    setEditingTodoId(todo.id);
                    openModal(todo.text);
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className={`modal ${isModalOpen ? "active" : ""}`}>
        <div className="modal-content">
          <button className="close-modal" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2>{editingTodoId ? "Edit Task" : "Add To-Do"}</h2>
          <label htmlFor="taskTitle">Title</label>
          <input
            type="text"
            placeholder="Ex- Learn React, Finish Portfolio Project, etc;"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <div className="modal-buttons">
            <button onClick={handleTaskAction}>
              {editingTodoId ? "Edit To-Do" : "Add To-Do"}
            </button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
