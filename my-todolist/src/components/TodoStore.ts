import { Todo } from './Interfaces';
import uuidv4 from "uuidv4";

export default class TodoStore {

    public todos: Todo[]

    addTodo ( title: string ): void {
        this.todos = [{
            id: uuidv4(),
            title: title,
            completed: false
        }, ...this.todos]
    }

    removeTodo ( todo: Todo ): void {
        this.todos = this.todos.filter( t => t !== todo )
    }

    toggleTodo ( todo: Todo, completed = true ): void {
        this.todos = this.todos.map( t => t !== todo ? { ...t, completed } : t )
    }

    toggleAll ( completed = true ) {
        this.todos = this.todos.map( t => completed !== t.completed ? { ...t, completed } : t )
    }
    updateTitle ( todo: Todo, title: string ): void {
        this.todos = this.todos.map( t => t !== todo ? { ...t, title } : t )

    }

    cleanCompleted (): void {
        this.todos = this.todos.filter( t => !t.completed )
    }

}