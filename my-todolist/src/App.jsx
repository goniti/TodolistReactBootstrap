import React from "react";
import "./App.css";
import s from "./components/TodoStore";

console.log(s);

function App() {
  return (
    <section className="todoapp">

      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" value="" />
      </header>
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">
        </label>
        <ul className="todo-list">
          <li className="" >
            <div className="view" >
              <input className="toggle" type="checkbox" />
              <label>s.</label>
              <button className="destroy" ></button>
            </div>
            <input className="edit" value="s." />
          </li>
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>1</strong>
          <span> </span>
          <span>item</span>
          <span> left</span>
        </span>
        <ul className="filters">
          <li>
            <a href="#/" className="selected" >All</a>
          </li>
          <span> </span>
          <li>
            <a href="#/active" className="" >Active</a>
          </li>
          <span> </span>
          <li>
            <a href="#/completed" className="" >Completed</a>
          </li>
        </ul>
      </footer>

    </section>
  );
}

export default App;
