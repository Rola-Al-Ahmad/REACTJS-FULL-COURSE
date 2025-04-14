import React from 'react'

const Header = ({ todos }) => {

    const todosLength = todos.length;
    const plural = todosLength === 1 ? '' : 's';
    
    return (
        <header className="header">
            <h1 className="text-gradient">
                You have {todos.length} open task{plural}.
            </h1>
        </header>
    )
}

export default Header