import { useEffect, useState } from 'react';
import Header from './components/Header'
import Tabs from './components/Tabs'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {

  // const todos = [
  //   { input: 'Hello! Add your first todo!', complete: true },
  //   { input: 'Get the groceries!', complete: false },
  //   { input: 'Learn how to web design', complete: false },
  //   { input: 'Say hi to gran gran', complete: true },
  // ]

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndexValue, setEditIndexValue] = useState('');
  const [selectedTab, setSelectedTab] = useState('Active');


  const handleAddTodo = (newTodo) => {
    setTodos([...todos, { input: newTodo, complete: false }]);
    handleSaveData([...todos, { input: newTodo, complete: false }]);
    setInputValue('');
  }

  const handleDeleteTodo = (index) => {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  const handleCompleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
    handleSaveData(newTodos);
  }

  function handleEditTodo(index) {
    const newTodos = [...todos];
    const todoToEdit = newTodos[index];
    setInputValue(todoToEdit.input);
    setEditIndexValue(index);
  }

  function handleSaveEdit() {
    const updatedTodos = [...todos];
    updatedTodos[editIndexValue] = { input: inputValue };
    setTodos(updatedTodos);
    setInputValue("");
    setEditIndexValue('');
    handleSaveData(updatedTodos);
  }

  function handleSaveData(currTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }))
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) { return }
    let db = JSON.parse(localStorage.getItem('todo-app'))
    setTodos(db.todos)
  }, [])

  return (
    <>
      <Header todos={todos} />
      <Tabs todos={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TodoList todos={todos} selectedTab={selectedTab} handleDeleteTodo={handleDeleteTodo} handleCompleteTodo={handleCompleteTodo} handleEditTodo={handleEditTodo} inputValue={inputValue} editIndexValue={editIndexValue} />
      <TodoInput handleAddTodo={handleAddTodo} inputValue={inputValue} setInputValue={setInputValue} editIndexValue={editIndexValue} handleSaveEdit ={handleSaveEdit}/>
    </>
  )
}

export default App
