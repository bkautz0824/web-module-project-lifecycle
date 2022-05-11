import React from 'react'

export default class Form extends React.Component {
  state = {
    input: ""
  }

 
  changeHandler = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      input: e.target.value
    })
  }


  postNewTodo = (e) => {
    e.preventDefault();
    this.props.postNewTodo(this.state.input)
  }

  
  render() {
    
    return (
      <form onSubmit={this.postNewTodo}>
        <input 
          onChange={this.changeHandler}
        />
        <button >Add</button> 
      </form>
    )
  }
}
