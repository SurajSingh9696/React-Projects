import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./Task.css";
import { FaCheckCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function Task({ inputValue, tasks, setTasks }) {
  const [newlyAddedTask, setNewlyAddedTask] = useState(null);

  useEffect(() => {
    if (inputValue !== "") {
      const newTask = { 
        id: uuidv4(),
        task: inputValue, 
        isDone: false 
      };
      setTasks(prevTasks => [newTask, ...prevTasks]);
      setNewlyAddedTask(newTask.id);
      
      const timer = setTimeout(() => {
        setNewlyAddedTask(null);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [inputValue]);

  useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDone = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const handleDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li 
          key={task.id}
          className={`task-item ${newlyAddedTask === task.id ? 'added' : ''}`}
        >
          <span className={`task-text ${task.isDone ? 'completed' : ''}`}>
            {task.task}
          </span>
          <div className="task-actions">
            <button
              className={`task-btn ${task.isDone ? 'done-btn active' : 'done-btn'}`}
              onClick={() => handleDone(task.id)}
              aria-label={task.isDone ? `Mark ${task.task} as not done` : `Mark ${task.task} as done`}
            >
              <FaCheckCircle size={18} />
            </button>
            <button
              className="task-btn delete-btn"
              onClick={() => handleDelete(task.id)}
              aria-label={`Delete ${task.task}`}
            >
              <MdDeleteForever size={20} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Task;