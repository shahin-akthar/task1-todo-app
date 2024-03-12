import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ImCross } from 'react-icons/im';
import { GrEdit } from 'react-icons/gr';
import './App.css';

class App extends Component {
  state = {
    todosList: [{id: uuidv4(), todo: 'React Js'}, {id: uuidv4(), todo: 'Node Js'}, {id: uuidv4(), todo: 'Javascript'}],
    userInput: '', error: '', isError: false
  };

  onChangeInput = (event) => {
    this.setState({ userInput: event.target.value, error: '', isError: false });
  };

  onClickCancel = (id) => {
    const { todosList } = this.state;
    const newTasks = todosList.filter((each) => each.id !== id);
    this.setState({ todosList: newTasks });
  };

  onClickEdit = (id) => {
    const { todosList } = this.state;
    const updatedTodos = todosList.map((each) => {
      if (each.id === id) {
        const editedTodo = window.prompt('Enter the text:')
        return {...each, edits: [...(each.edits || []), {text: editedTodo}]}
      }
      return each;
    });
    this.setState({ todosList: updatedTodos });
  };

  addTodo = () => {
    const { userInput, todosList } = this.state;
    const todoInput = userInput.split(' ');
    const todoLength = todoInput.length;
    const quantity = parseInt(todoInput[todoLength - 1], 10);
    let newTodos = [...todosList];
    if (userInput === '') {
      this.setState({error: 'Please enter todo', isError: true})
    } else {
      if (!isNaN(quantity) && quantity > 0) {
        for (let i = 0; i < quantity; i++) {
          const newTodo = { id: uuidv4(), todo: todoInput.slice(0, todoLength - 1).join(' ')};
          newTodos.push(newTodo);
        }
      } else {
        const newTodo = { id: uuidv4(), todo: todoInput.join(' ')};
        newTodos.push(newTodo);
      }
    }
    this.setState({ todosList: [...newTodos], userInput: '' });
  };

  render() {
    const { todosList, userInput, error, isError } = this.state;
    console.log(todosList)
    return (
      <div className='back-ground'>
        <div className='container'>
          <h1 className='heading'>Day Goals!</h1>
          <input type='text' placeholder='Add Your Todo' className='input' value={userInput} onChange={this.onChangeInput} />
          {isError && <p className='error'>{error}</p>}
          <button className='button' onClick={this.addTodo}>Add Todo</button>
          {todosList.map((each) => (
            <div className='todo-container' key={each.id}>
              <p className='todo-text'>{each.edits && each.edits.length > 0 ? each.edits[each.edits.length - 1].text : each.todo} (Updated {each.edits ? each.edits.length : 0} Times)</p>
              <div className='icons'>
                <button onClick={() => this.onClickEdit(each.id)} className='edit-icon'>
                  <GrEdit className='edit-icon' />
                </button>
                <ImCross className='cross-icon' onClick={() => this.onClickCancel(each.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
