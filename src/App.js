import { useEffect, useState } from "react";

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
      setTask('')
    }
    
  };
  const HandleDeleteTask =(index)=>{
    const updatedList = todos.filter((item,i)=>{
      return i!==index
    })
    setTodos(updatedList)
    console.log(updatedList)
  }
  // useEffect(()=>{
  //   console.log(todos)
  // },[todos])

  return (
    <div className="App">
      <h1>Task</h1>
      <input onChange={HandleInputTask} value={task} />
      <button onClick={handleAddTask}>AddTask</button>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={()=>HandleDeleteTask(index)}>Delete</button>
            </li>
        ))}
        
      </ul>
    </div>
  );
}

export default App;
