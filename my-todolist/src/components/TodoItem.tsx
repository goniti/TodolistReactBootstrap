import * as React from 'react'
import { Todo } from './Interfaces'
import cx from 'classnames'

interface Props {
	item: Todo
	onToggle: (item: Todo) => void
	onDestroy: (item: Todo) => void
	onUpdate: (item: Todo, title: string) => void
}

interface State {
	editing: boolean
	title: string
}

export default class TodoItem extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			editing: false,
			title: '',
		}
	}

	render() : JSX.Element {
		const { item } = this.props
		const { editing, title } = this.state
		return (
			<li className={cx({ completed: item.completed, editing })}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						onChange={this.toggle}
						checked={item.completed}
					/>
					<label onDoubleClick={this.edit}>{item.title}</label>
					<button className="destroy" onClick={this.destroy} />
				</div>
				<input
					className="edit"
					value={title}
					onBlur={this.handleBlur}
					onKeyDown={this.handleKeyDown}
					onInput={this.handleInput}
					type="text"
				/>
			</li>
		)
	}
	toggle = () : void => {
		this.props.onToggle(this.props.item)
	}

	destroy = () : void => {
		this.props.onDestroy(this.props.item)
	}

	edit = () : void =>  {
		this.setState({ editing: true, title: this.props.item.title })
	}

	handleBlur = () : void => {
		this.props.onUpdate(this.props.item, this.state.title)
		this.setState({ editing: false })
	}

	handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) : void => {
		if (e.key === 'Escape') {
			this.setState({ editing: false })
		} else if (e.key === 'Enter') {
			this.handleBlur()
		}
	}

	handleInput = (e: React.FormEvent<HTMLInputElement>) : void => {
		this.setState({ title: (e.target as HTMLInputElement).value })
	}
}
