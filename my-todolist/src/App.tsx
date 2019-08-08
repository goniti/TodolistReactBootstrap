import * as React from "react";
import TodoStore from "./components/TodoStore";
import TodoItem from "./components/TodoItem";
import { Todo } from "./components/Interfaces";
import "./App.css";
import cx from "classnames";

type FilterOptions = "all" | "completed" | "active";

const Filters = {
  completed: (item: Todo) => item.completed,
  active: (item: Todo) => !item.completed,
  all: (item: Todo) => true
};

interface TodoListProps {}

interface TodoListState {
  items: Todo[];
  label: string;
  filter: FilterOptions;
}

export default class App extends React.Component<TodoListProps, TodoListState> {
  private store: TodoStore = new TodoStore();
  private toggleItem: (item: Todo) => void;
  private removeItem: (item: Todo) => void;
  private updateTitle: (item: Todo, title: string) => void;
  private clearCompleted: () => void;

  constructor(props: TodoListProps) {
    super(props);
    this.state = {
      items: [],
      label: "",
      filter: "all"
    };
    this.store.handleChange(store => {
      this.setState({ items: store.items });
    });

    this.toggleItem = this.store.handleToggle.bind(this.store);
    this.removeItem = this.store.handleRemove.bind(this.store);
    this.updateTitle = this.store.handleUpdate.bind(this.store);
    this.clearCompleted = this.store.handleClearCompleted.bind(this.store);
  }

  get remaining(): number {
    return this.state.items.reduce(
      (count, item) => (!item.completed ? count + 1 : count),
      0
    );
  }

  get completed(): number {
    return this.state.items.reduce(
      (count, item) => (item.completed ? count + 1 : count),
      0
    );
  }

  componentDidMount() {
    this.store.handleSubmit("Learn JavaScript");
    this.store.handleSubmit("Use React");
  }

  render() {
    let { items, label, filter } = this.state;
    let remaining = this.remaining;
    let completed = this.completed;
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
            autoFocus
          />
        </header>
        <section className="main">
          {items.length > 0 && (
            <input
              className="toggle-all"
              type="checkbox"
              checked={remaining === 0}
              onChange={this.toggleAll}
            />
          )}
          <label htmlFor="toggle-all">All as complete</label>
          <ul className="todo-list">
            {items.map(item => {
              return (
                <TodoItem
                  item={item}
                  key={item.id}
                  onToggle={this.toggleItem}
                  onDestroy={this.removeItem}
                  onUpdate={this.updateTitle}
                />
              );
            })}
          </ul>
        </section>
        <footer className="footer">
          {remaining > 0 && (
            <span className="todo-count">
              <strong>{remaining}</strong>
              <span> </span>
              <span>remaining</span>
              <span>
                {" "}
                task{remaining > 1 && "s"} {filter}
              </span>
            </span>
          )}
          <ul className="filters">
            <li>
              <a
                href="#/"
                className={cx({ selected: filter === "all" })}
                onClick={this.setFilter("all")}
              >
                All
              </a>
            </li>
            <span> </span>
            <li>
              <a
                href="#/active"
                className={cx({ selected: filter === "active" })}
                onClick={this.setFilter("active")}
              >
                Active
              </a>
            </li>
            <span> </span>
            <li>
              <a
                href="#/completed"
                className={cx({ selected: filter === "completed" })}
                onClick={this.setFilter("completed")}
              >
                Completed
              </a>
            </li>
          </ul>
          {completed > 0 && (
            <button className="clear-completed" onClick={this.clearCompleted}>
              Clear completed
            </button>
          )}
        </footer>
      </section>
    );
  }

  updateLabel = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ label: (e.target as HTMLInputElement).value });
  };

  addItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      this.store.handleSubmit(this.state.label);
      this.setState({ label: "" });
    }
  };

  toggleAll = (e: React.FormEvent<HTMLInputElement>) => {
    this.store.handleToggleAll(this.remaining > 0);
  };

  setFilter = (filter: FilterOptions) => {
    return (e: React.MouseEvent<HTMLElement>) => {
      this.setState({ filter });
    };
  };
}
