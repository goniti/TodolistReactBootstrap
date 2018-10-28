import React from 'react';

class TodoList extends React.Component {
  
    render() {
      return (
        <ul className="list-group m-5">
          {this.props.items.map(item => (
            <li className="list-group-item p-3 mb-2 bg-info text-dark" key={item.id}>{item.text}</li>
          ))}
        </ul>
      );
    }
  }

  export default TodoList;