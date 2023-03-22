import { useState, useEffect } from "react";
import ToDo from "./components/ToDo"
import { getAllTodo, addToDo, updateToDo, deleteToDo } from "./utils/HandleApi";


function App() {

  const [todo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [toDoId, setToDoId] = useState("")
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() =>{
    getAllTodo(setToDo)
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>

      <div className="top">
        <input
          type="text"
          placeholder="Add Items.."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="add" 
        onClick={ isUpdating ? 
        () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating) 
        : () => addToDo(text, setText, setToDo)}>
          {isUpdating ? "update" : "Add"}
        </div>
      </div>

      <div className="list">

        {todo.map((item) => <ToDo 
        key={item._id} 
        text={item.text} 
        updateMode = {() => updateMode(item._id, item.text)}
        deleteToDo = {() => deleteToDo(item._id, setToDo)}
        />)}

      </div>
      
      </div>  
    </div>
  );
}

export default App;
