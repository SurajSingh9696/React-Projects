import { useState, useRef, useEffect } from "react";
import Task from "./components/Task";
import DateAndTime from "./components/DateAndTime";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState(()=>{
   try {
     const savedTasks = localStorage.getItem("tasks");
     return savedTasks ? JSON.parse(savedTasks) : [];
   } catch (error) {
     console.error("Error reading tasks from localStorage:", error);
     return [];
   }
  });
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = inputRef.current.value.trim();
    
    if (input === "") {
      inputRef.current.focus();
      return;
    }
    
    if (tasks.some(task => task.task.toLowerCase() === input.toLowerCase())) {
      alert("Task is already added");
      inputRef.current.focus();
      return;
    }
    
    setInputValue(input);
    inputRef.current.value = "";
    inputRef.current.focus();
  }

  return (
    <div className="app-container">
      <section>
        <header>
          <h1>Todo List</h1>
          <DateAndTime />
        </header>
      </section>

      <section>
        <form onSubmit={handleSubmit} className="task-form">
          <input 
            type="text" 
            placeholder="Add a new task" 
            ref={inputRef}
            className="task-input"
          />
          <button type="submit" className="add-btn">Add</button>
        </form>
        <button 
          onClick={() => setTasks([])} 
          className="clear-btn"
          disabled={tasks.length === 0}
        >
          Clear All
        </button>
      </section>

      <section>
        <Task inputValue={inputValue} tasks={tasks} setTasks={setTasks} />
      </section>
    </div>
  )
}

export default App;