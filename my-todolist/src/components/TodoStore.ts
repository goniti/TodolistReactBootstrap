import { Todo } from "./Interfaces";
import uuidv4 from "uuidv4";
declare type ChangeCallback = ( store: TodoStore ) => void

export default class TodoStore {
  public items: Todo[] = [];
  private callbacks: ChangeCallback[] = []


  inform () {
    this.callbacks.forEach( cb => cb( this ) )
  }

  handleChange ( cb: ChangeCallback ) {
    this.callbacks.push( cb )
  }

  handleSubmit ( title: string ): void {
    this.items = [
      {
        id: uuidv4(),
        title: title,
        completed: false
      },
      ...this.items
    ]
    this.inform()
  }

  handleUpdate ( item: Todo, title: string ): void {
    this.items = this.items.map( t => ( t === item ? { ...t, title } : t ) );
    this.inform()
  }

  handleToggle ( item: Todo ): void {
    this.items = this.items.map( t => ( t === item ? { ...t, completed: !t.completed } : t ) );
    this.inform()
  }

  handleToggleAll ( completed = true ) {
    this.items = this.items.map( t =>
      completed !== t.completed ? { ...t, completed } : t
    );
    this.inform()
  }

  handleRemove ( item: Todo ): void {
    this.items = this.items.filter( t => t !== item );
    this.inform()
  }
  handleClearCompleted (): void {
    this.items = this.items.filter( t => !t.completed );
    this.inform()
  }
}
