import React from "react";
import "./App.css";
import TodoStore from "./components/TodoStore";
import { Todo } from "./components/Interfaces";
import TodoItem from "./components/TodoItem";
import { FormEvent, KeyboardEvent } from "react";

interface TodoListProps {}

interface TodoListState {
  todos: Todo[];
  label: string;
}

export default class App extends React.Component<TodoListProps, TodoListState> {
  private store: TodoStore = new TodoStore();
  private handleToggle: (todo: Todo) => void;
  private destroyTodo: (todo: Todo) => void;

  constructor(props: TodoListProps) {
    super(props);
    this.state = {
      todos: [],
      label: ""
    };
    this.store.handleChange(store => {
      this.setState({ todos: store.todos });
    });

    this.handleToggle = this.store.handleToggle.bind(this.store);
    this.destroyTodo = this.store.handleRemove.bind(this.store);
  }

  componentDidMount() {
    this.store.handleSubmit("Salut");
    this.store.handleSubmit("Les Gens");
  }

  render() {
    let { todos, label } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            value={label}
            placeholder="What needs to be done?"
            onInput={this.updateLabel}
            onKeyPress={this.addItem}
          />
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {todos.map(todo => {
              return (
                <TodoItem
                  todo={todo}
                  key={todo.id}
                  onToggle={this.handleToggle}
                  onDestroy={this.destroyTodo}
                />
              );
            })}
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
              <a href="#/" className="selected">
                All
              </a>
            </li>
            <span> </span>
            <li>
              <a href="#/active" className="">
                Active
              </a>
            </li>
            <span> </span>
            <li>
              <a href="#/completed" className="">
                Completed
              </a>
            </li>
          </ul>
        </footer>
      </section>
    );
  }
  updateLabel = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ label: (e.target as HTMLInputElement).value });
  };
  addItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      this.store.handleSubmit(this.state.label);
      this.setState({ label: "" });
    }
  };
}
