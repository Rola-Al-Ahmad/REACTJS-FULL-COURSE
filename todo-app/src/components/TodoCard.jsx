import React from 'react'

const TodoCard = ({ todo, handleDeleteTodo, handleCompleteTodo, handleEditTodo, todoIndex, inputValue, editIndexValue }) => {
    
    return (
        <div className="card todo-item">
            <p>{ todoIndex === editIndexValue ? inputValue : todo.input }</p>
            <div className="todo-buttons">
                <button disabled={todo.complete} onClick={() => {handleCompleteTodo(todoIndex)}}>
                    <h6>Done</h6>
                </button>
                <button onClick={() => { handleEditTodo(todoIndex)}}>
                    <h6>Edit</h6>
                </button>
                <button onClick={() => {handleDeleteTodo(todoIndex)}}>
                    <h6>Delete</h6>
                </button>
            </div>
        </div>
    )
}

export default TodoCard