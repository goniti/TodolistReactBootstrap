import React from 'react';
import TodoList from './TodoList';
import './Todo.css';

class TodoApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.removeTodo = this.removeTodo.bind(this);
    }
  
    render() {
      return (
        <div>
          <h3 className="text-white mb-3">Ma liste de course</h3>
          <form onSubmit={this.handleSubmit}>
          <div className="row align-items-center form-group p-auto ">
            <label htmlFor="new-todo">
            <span className="m-2 text-white font-weight-bold">Nombre d'article {this.state.items.length}</span>
            </label>
            <input
              className="form-control shadow p-auto w-75 bg-white rounded"
              id="new-todo"
              placeholder="Nouveau article"
              onChange={this.handleChange}
              value={this.state.text}
            />
            </div>
           <button className="btn btn-primary m-25" type="submit">
              Ajoutez 
            </button> 
          </form>
          <TodoList items={this.state.items} removeTodo={this.removeTodo}/>
        </div>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      if (!this.state.text.length) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now()
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: ''
      }));
    }
    removeTodo(newItem){
      this.setState({
          todo: this.state.todo.filter(this.items !== newItem)
      })
    }
  }
  
    
  export default TodoApp;