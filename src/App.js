import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");

  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    return storedTodos || [];
  });

  const getCurrentDate = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    return currentDate;
  };
  const [date, setDate] = useState(getCurrentDate());

  const HandleInputTask = (event) => {
    setTask(event.target.value);
    console.log(task);
  };
  const HandleDate = (event) => {
    setDate(event.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== "" && date.trim() !== "") {
      const newTask = { task, date, reminder: false };
      const currentDate = new Date().toISOString().slice(0, 10);
      if (date >= currentDate) {
        setTodos((todos) => [...todos, newTask]);
        setTask("");
        setDate(getCurrentDate());
      } else {
        alert("pls select valid date");
      }
    }
  };
  const HandleReminder = (index) => {
    const updatedList = todos.map((todo, i) => {
      return i === index ? { ...todo, reminder: !todo.reminder } : todo;
    });
    setTodos(updatedList);
  };
  const HandleDeleteTask = (index) => {
    const updatedList = todos.filter((item, i) => {
      return i !== index;
    });
    setTodos(updatedList);
    console.log(updatedList);
  };
  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    todos.forEach((item) => {
      if (item.reminder && item.date === currentDate) {
        window.alert(`Reminder for task: ${item.task}`);
      }
    });
  }, [todos]);

  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem("todos"));
  //   if (storedTodos) {
  //     setTodos(storedTodos);
  //   }
  // }, []);
  // store todos in local storage

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <input onChange={HandleInputTask} value={task} />
      <input type="date" onChange={HandleDate} value={date} />
      <button onClick={handleAddTask}>AddTask</button>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            {item.task} {item.date}
            <button onClick={() => HandleReminder(index)}>
              {item.reminder ? "Disable Reminder" : "Set Reminder"}
            </button>
            <button onClick={() => HandleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
