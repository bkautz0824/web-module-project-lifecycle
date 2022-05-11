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


   fetchTodos = () => {
    axios.get(URL)
    .then(res => {
      
      this.setState({
        ...this.state,
        todos: res.data.data
      })
      
    })
    .catch(err => {
      this.setState({
        ...this.state, error: err.response.data.message
        })
      })
   }

   componentDidMount() {
    this.fetchTodos()
  }


  //  handleAdd = (task) => {
  //   const newTodo = {
  //     task: task,
  //     id: Date.now(),
  //     completed: false
  //   }
  //    this.setState({
  //      ...this.state,
  //      todos: [...this.state.todos, newTodo]
  //    })
  //  }


   postNewTodo = () => {
     axios.post(URL, {name: this.state.todoNameInput})
     .then(res => {
        this.fetchAllTodos()
        this.setState({
          ... this.state, name: ''
        })
     })
     .catch(err => {
      this.setState({
        ...this.state, error: err.response.data.message
      })
     })
   }

   onTodoChange = evt => {
     const { value } = evt.target
      this.setState({ ...this.state, todoNameInput: value })
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
