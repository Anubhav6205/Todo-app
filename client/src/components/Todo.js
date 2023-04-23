import React, { useState, useEffect } from "react";
import Typed from 'typed.js';

import {
  addTodo,
  getTodos,
  updateTodos,
  deleteTodos,
  deleteAllTodos,
  searchTodos
} from "../utils/Handleapi";
export let formData;
export default function Todo() {
  const [data, setData] = useState("");
  const [updateData, setUpdateData] = useState(false);
  const [todoData, setTodoData] = useState([]);
  const [id, setId] = useState("");

  const [changedData, setChangedData] = useState(true);
  const [completedTodoIds, setCompletedTodoIds] = useState([]);

  const handleChange = (event) => {
    //updating the input data
    const value = event.target.value;
    setData(value);
    formData = value;
    console.log(`this is form data :${value}`);
  };

  const handleSubmit = (event) => {
    //managing the submit
    const icon = document.querySelector(".submit");
    icon.classList.add("icon-rotate");
    setTimeout(() => {
      icon.classList.remove("icon-rotate");
    }, 1000);
    event.preventDefault();
    if (updateData) {
      updateTodos(data, id);
      setUpdateData(false);
    } else {
      addTodo();
    }
    setData("");
    setChangedData(true);
  };

  useEffect(() => {
    //updating getTodos when page reloads
    console.log("setting back to normal");
    setChangedData(false);
    getTodos().then((data) => {
      setTodoData(data);
    });
  }, [changedData]);

  const searchTodo = () => {
    searchTodos().then((data) => {
      const icon = document.querySelector(".search");
      icon.classList.add("icon-search");
      setTimeout(() => {
        icon.classList.remove("icon-search");
      }, 1000);
      setTodoData(data);
      console.log(data);
      console.log(todoData);
    });
  };

  const updateId = (id) => {
    //updating the id
    setUpdateData(true);
    setId(id);
  };

  const deleteStatement = (id) => {
    deleteTodos(id);
    setChangedData(true);
  };

  const deleteAllStatement = () => {
    const icon = document.querySelector(".clearall");
    icon.classList.add("icon-dustbin");
    setTimeout(() => {
      icon.classList.remove("icon-dustbin");
    }, 1000);
    deleteAllTodos();
    setChangedData(true);
  };

  const completedTodos = (id) => {
    //... creates a new array with existing todo ids and adds the new id
    setCompletedTodoIds([...completedTodoIds, id]);
  };


  const words = ['TODO', 'TOOL', 'TASK MANAGER', 'TECH'];


  useEffect(() => {
    const options = {
      strings: words,
      typeSpeed: 300,
      backSpeed: 100,
      loop: true,
      loopCount: Infinity
    };

    const typed = new Typed('.type', options);

    return () => {
      typed.destroy();
    };
  }, []);
  

  return (
    <div className="container">
      <script src="https://unpkg.com/typed.js@2.0.14/dist/typed.umd.js"></script>
      <div className="header">
        IT'S A <span className="type"></span>
      </div>

      <div className="middle">
        <form className="form" onSubmit={handleSubmit}>
          <div className="left">
            <input
              type="text"
              placeholder="Enter new todo"
              className="input"
              value={data}
              onChange={handleChange}
            />
          </div>
          <div className="right">
            {updateData ? (
              <i
                className="fa fa-angle-double-up submit"
                onClick={handleSubmit}
              ></i>
            ) : (
              <i
                className="fa fa-plus submit"
                aria-hidden="true"
                onClick={handleSubmit}
              ></i>
            )}

            <i
              className="fa fa-trash-o clearall"
              onClick={() => deleteAllStatement()}
            ></i>

            <i className="fa fa-search search" onClick={() => searchTodo()} />
          </div>
        </form>
      </div>

      <div className="list">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        {todoData.map((todo) => (
          <div className="todos" key={todo._id}>
            <div className={`statement left`}>
              <span
                className={`span  ${
                  completedTodoIds.includes(todo._id) ? "completed" : ""
                }`}
              >
                {todo.statement}
              </span>
            </div>
            <div className="right">
              <i
                className="fa fa-check check"
                onClick={() => completedTodos(todo._id)}
              ></i>
              <i
                className="fa fa-edit edit"
                onClick={() => {
                  updateId(todo._id);
                }}
              ></i>
              <i
                className="fa fa-times cross"
                onClick={() => deleteStatement(todo._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
