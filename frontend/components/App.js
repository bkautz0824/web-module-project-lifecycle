import React from 'react'
import axios from 'axios'
import TodoList from './TodoList'
import Form from './Form'


const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  
  state = {
    todos: [],
    error: '',
   }


   fetchTodos = () => {
    axios.get(URL)
    .then(res => {
      console.log(res.data.data)
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


   addTodos = (task) => {
    const addedTodo = {
      task: task,
      id: Date.now(),
      completed: false
    }
    axios.post(URL, addedTodo)
      .then(res => {
        this.setState({...this.state, todos: [...this.state, ]})
      })
        .catch(error => {
          this.setState({
            ...this.state, error: error.res.data.message
            })
          }
        )
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
      
       <Form handleAdd={this.addTodos} />
       <button onClick={this.handleClear}>Clear</button>
      </div>
    )
  }
}
