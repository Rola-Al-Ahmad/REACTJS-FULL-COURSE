import React from 'react'

const Tabs = ({ todos, selectedTab, setSelectedTab }) => {

    const tabs = ['All', 'Active', 'Completed'];

    return (
        <nav className="tab-container">
            {tabs.map((tab, index) => {
                const numOfTasks = tab === 'All'
                    ? todos.length
                    : tab === 'Active'
                        ? todos.filter(val => !val.complete).length
                        : todos.filter(val => val.complete).length;

                return (
                    <button key={index} className={`tab-button ${selectedTab === tab ? ' tab-selected' : ''}`}
                        onClick={() => setSelectedTab(tab)}
                    >
                        <h4>{tab} <span>({numOfTasks})</span></h4>
                    </button>
                );
            })}
            <hr />
        </nav>
    )
}

export default Tabs