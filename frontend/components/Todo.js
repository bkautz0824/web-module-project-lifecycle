import React from 'react'

export default class Todo extends React.Component {
  handleClick = () => {
    
    this.props.handleToggle(this.props.todo.id);
   }

  render() {

    const { todo } = this.props;
    
    return (
      <div>
        <p><li onClick={this.handleClick}>{todo.name} { todo.completed? <span>Completed</span> : <span></span>} </li></p>
      </div>
    )
  }
}
