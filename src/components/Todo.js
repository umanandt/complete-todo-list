import React, { useEffect, useState } from "react";
import List from "./List";

const Todo = () => {
  let todoListt = JSON.parse(localStorage.getItem("allEntries"));
  if (todoListt == null) todoListt = [];

  const [todoTask, setTodoTask] = useState(todoListt);
  const [newTodos, setNewTodos] = useState();
  const [render, setRender] = useState();

  const getTask = (e) => {
    setNewTodos(e.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();
    setTodoTask({
      task: newTodos,
      isCompleted: "false",
    });
    todoListt.push({ task: newTodos, isCompleted: "false" });
    localStorage.setItem("allEntries", JSON.stringify(todoListt));
    /* setTodoTask([
      ...todoTask,
      {
        task: newTodos,
        isCompleted: "false",
      },
    ]);*/
  };

  const onDelete = (index) => {
    todoListt = JSON.parse(localStorage.getItem("allEntries"));
    // todoListt.splice(index, 1);
    todoListt.splice(index, 1);
    //setTodoTask(allTodos);
    localStorage.setItem("allEntries", JSON.stringify(todoListt));
    setRender(true);
  };

  useEffect(() => {
    setRender(false);
  }, [render]);

  const onCompleted = (index) => {
    //const allTodos = [...todoTask];
    todoListt = JSON.parse(localStorage.getItem("allEntries"));
    todoListt[index].isCompleted = "true";
    localStorage.setItem("allEntries", JSON.stringify(todoListt));
    
  };

  const onDone = (index, updateValue) => {
    //  const allTodos = [...todoTask];
    todoListt = JSON.parse(localStorage.getItem("allEntries"));
    todoListt.splice(
      index,
      1,

      {
        task: updateValue,
        isCompleted: "false",
      }
    );
    localStorage.setItem("allEntries", JSON.stringify(todoListt));
    setRender(true);
  };

  return (
    <div className="container-sm">
      <form onSubmit={handleForm}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add Task"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            id="task"
            onChange={getTask}
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Add
          </button>
        </div>
      </form>

      <ul className="list-group">
        {todoListt != null &&
          todoListt.map((element, index) => (
            <List
              key={index}
              index={index}
              todo={element.task}
              isCompleted={element.isCompleted}
              onDelete={onDelete}
              onCompleted={onCompleted}
              onDone={onDone}
            />
          ))}
      </ul>
    </div>
  );
};

export default Todo;
