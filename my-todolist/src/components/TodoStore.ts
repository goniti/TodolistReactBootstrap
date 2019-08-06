import { Todo } from "./Interfaces";
import uuidv4 from "uuidv4";
declare type ChangeCallback = ( store: TodoStore ) => void

export default class TodoStore {
  private callbacks: ChangeCallback[] = []
  public todos: Todo[] = [];

  inform () {
    this.callbacks.forEach( cb => cb( this ) )
  }

  handleChange ( cb: ChangeCallback ) {
    this.callbacks.push( cb )
  }

  handleSubmit ( title: string ): void {
    this.todos = [
      {
        id: uuidv4(),
        title: title,
        completed: false
      },
      ...this.todos
    ]
    this.inform()
  }

  handleUpdate ( todo: Todo, title: string ): void {
    this.todos = this.todos.map( t => ( t !== todo ? { ...t, title } : t ) );
    this.inform()
  }

  handleToggle ( todo: Todo ): void {
    this.todos = this.todos.map( t => ( t !== todo ? { ...t, completed: !t.completed } : t ) );
    this.inform()
  }

  handleToggleAll ( completed = true ) {
    this.todos = this.todos.map( t =>
      completed !== t.completed ? { ...t, completed } : t
    );
    this.inform()
  }

  handleRemove ( todo: Todo ): void {
    this.todos = this.todos.filter( t => t !== todo );
    this.inform()
  }
  handleClearCompleted (): void {
    this.todos = this.todos.filter( t => !t.completed );
    this.inform()
  }
}
