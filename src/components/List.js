import React, { useEffect, useState } from "react";

const List = (props) => {
  const [taskCompleted, settaskCompleted] = useState();
  const [editValue, setEditValue] = useState(false);
  const [updateValue, setUpdatedValue] = useState();
  // const [render, setUseRender] = useState();

  const deleteTask = (index) => {
    props.onDelete(index);
  };

  const completeTask = (index) => {
    props.onCompleted(index);
    settaskCompleted(props.isCompleted);
    // setUseRender(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      settaskCompleted();
    }, 10000);

    return () => clearInterval(interval);
  }, [taskCompleted]);

  const editTask = (index) => {
    setEditValue(true);
  };

  const newValue = (e) => {
    setUpdatedValue(e.target.value);
  };
  const doneTask = (index) => {
    props.onDone(index, updateValue);
    setEditValue(false);
  };

  return (
    <>
      {editValue ? (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            placeholder={props.todo}
            onChange={newValue}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={() => doneTask(props.index)}
          >
            Done
          </button>
        </div>
      ) : (
        <li className="input-group mb-3" key={props.index}>
          <div
            className="form-control"
            style={{ textDecoration: taskCompleted ? "line-through" : "" }}
          >
            {props.todo}{" "}
          </div>
          <div>
            <button
              className="btn btn-outline-primary"
              type="button"
              id="button-addon2"
              onClick={() => deleteTask(props.index)}
            >
              Delete
            </button>
            {taskCompleted ? (
              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={() => completeTask(props.index)}
              >
                Not Completed
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={() => completeTask(props.index)}
              >
                Completed
              </button>
            )}
            <button
              type="button"
              className="btn btn-outline-warning"
              onClick={() => editTask(props.index)}
            >
              Edit
            </button>
          </div>
        </li>
      )}
    </>
  );
};

export default List;
