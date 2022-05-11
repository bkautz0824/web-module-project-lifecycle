import React from 'react'
import axios from 'axios'
import TodoList from './TodoList'
import Form from './Form'


const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  
  state = {
    todos: [],
    error: '',
    todoNameInput: ''
   }


   onTodoChange = evt => {
    const { value } = evt.target
     this.setState({ ...this.state, todoNameInput: value })
  }

   fetchTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({
        ...this.state,
        todos: res.data.data
      })
      
    })
    .catch(this.setErrorMessage)
   }

  resetForm = () => {
    this.setState({
      ... this.state, todoNameInput: ''})
  }

  setErrorMessage = (err) => {
    this.setState({
      ...this.state, error: err.response.data.message
      })
  }

   postNewTodo = () => {
     axios.post(URL, {name: this.state.todoNameInput})
     .then(res => {
        this.fetchTodos()
        this.resetForm()
     })
     .catch(this.setErrorMessage)
   }


   componentDidMount() {
    this.fetchTodos()
  }

   onTodoFormSubmit = evt => {
     evt.preventDefault()
     this.postNewTodo();
   }

  handleClear = () => {
    this.setState({
      ...this.state,
      todos: this.state.todos.filter(item => !item.completed)
    })
  }


 handleToggle = (clickedId) => {
   axios.patch(`${URL}/${clickedId}`, )
   .then(res => {
     console.log(res)
    this.setState({
      ...this.state, 
      todos: this.state.todos.map(todo => {
        if (todo.id === clickedId){
          return {
            ...todo, 
            completed: !todo.completed
          }
        } 
          return todo;
      })
    })
   })
   .catch(this.setErrorMessage)
  
 }

  render() {
    
    const { todos } = this.state;
    return (
      <div>
        <h2>Error: {this.state.error}</h2>
       <h1>Todos</h1>

        <TodoList handleToggle={this.handleToggle} todos={todos} />
      
        <form onSubmit={this.onTodoFormSubmit}>
         <input 
          
          onChange={this.onTodoChange}
          value={this.state.todoNameInput} 
          type='text'
          />
         <input type='submit'></input> 
       </form>
       <button onClick={this.handleClear}>Clear</button>
      </div>
    )
  }
}
