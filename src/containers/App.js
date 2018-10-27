import React, { Component } from 'react';
import './App.css';
import TodoApp from '../components/TodoApp';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">           
            <TodoApp />
        </header>
      </div>
    );
  }
}

export default App;
