import React from 'react'

export default class Form extends React.Component {
  state = {
    input: ""
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleAdd(this.state.input);
  }

  changeHandler = (e) => {
    this.setState({
      ...this.state,
      input: e.target.value
    })
  }
  render() {
    return (
      <form>
        <input 

          onChange={this.changeHandler}
        />
        <button onClick={this.handleSubmit}>Add</button> 
      </form>
    )
  }
}
