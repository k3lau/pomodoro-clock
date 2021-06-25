import React, { useState } from "react";

const AddSetting = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo === "") {
      return;
    }
    let todoObject = {
      id: todos.length + 1,
      task: todo,
      completed: false,
    };
  };

  return (
    <div className="container">
      <div className="body">
        <h3>Create a todo</h3>
        <div className="todo-form">
          <form>
            <label>
              Add todo
              <input type="text" name="todo" />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSetting;
