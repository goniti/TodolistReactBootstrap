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

	render() {
		const { item, onDestroy, onToggle } = this.props
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
	toggle = () => {
		this.props.onToggle(this.props.item)
	}

	destroy = () => {
		this.props.onDestroy(this.props.item)
	}

	edit = (e: React.MouseEvent<HTMLLabelElement>) => {
		this.setState({ editing: true, title: this.props.item.title })
	}

	handleBlur = () => {
		this.props.onUpdate(this.props.item, this.state.title)
		this.setState({ editing: false })
	}

	handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Escape') {
			this.setState({ editing: false })
		} else if (e.key === 'Enter') {
			this.handleBlur()
		}
	}

	handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		this.setState({ title: (e.target as HTMLInputElement).value })
	}
}
