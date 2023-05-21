import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const HandleInputTask = (event) => {
    setTask(event.target.value);
    console.log(task);
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTodos([...todos,task]);
    }
  };

  return (
    <div className="App">
      <h1>Task</h1>
      <input onChange={HandleInputTask} value={task} />
      <button onClick={handleAddTask}>AddTask</button>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
