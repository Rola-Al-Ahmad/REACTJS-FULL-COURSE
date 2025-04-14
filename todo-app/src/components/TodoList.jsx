import React from 'react'
import TodoCard from './TodoCard'

const TodoList = ({ todos, selectedTab, handleDeleteTodo, handleCompleteTodo, handleEditTodo, inputValue, editIndexValue }) => {
    
    const filterTodosList = selectedTab === 'All' ?
        todos :
        selectedTab === 'Completed' ?
            todos.filter(val => val.complete) :
            todos.filter(val => !val.complete)

    return (
        <>
            {filterTodosList.map((todo, todoIndex) => {
                
                const realTodoIndex = todos.findIndex(val => val.input == todo.input)
                
                return (
                    <TodoCard
                        key={todoIndex}
                        todo={todo}
                        handleDeleteTodo={handleDeleteTodo}
                        handleCompleteTodo={handleCompleteTodo}
                        handleEditTodo={handleEditTodo}
                        todoIndex={realTodoIndex}
                        inputValue={inputValue}
                        editIndexValue={editIndexValue}
                    />
                )
            })}
        </>
    )
}

export default TodoList