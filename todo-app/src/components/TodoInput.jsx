import React from 'react'

const TodoInput = ({ handleAddTodo, inputValue, setInputValue, editIndexValue, handleSaveEdit }) => {

    return (
        <div className="input-container">
            <input type="text" placeholder='What do you want to do?'
                value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        editIndexValue !== '' ? handleSaveEdit() : handleAddTodo(inputValue)
                    }
                }}


            />
            <button onClick={() => {
                editIndexValue !== '' ? handleSaveEdit() : handleAddTodo(inputValue)
                
            }}
                disabled={!inputValue}>
                {editIndexValue!=='' ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-plus"></i>}
            </button>
        </div>
    )
}

export default TodoInput