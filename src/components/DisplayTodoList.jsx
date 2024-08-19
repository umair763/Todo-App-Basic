import { useState } from 'react';
import './styles/DisplayTodoList.css';
 
function DisplayTodoList({ list, toggleTaskStatus }) {
    
    function handleCheckboxChange() {
        toggleTaskStatus(list.task); 
    }

    return (
        <div className="scrollcontainer">
            <div className="listbar">
                <input
                    type="radio"
                    className={`${
                        list.color === 'red' ? 'radiored' : list.color === 'yellow' ? 'radioyellow' : 'radiogreen'
                    }`}
                />
                <p  className={`time ${list.status ? 'strikethough' : ''}`}>{list.task}</p>
                <div className="time">
                    <p className={`${list.status ? 'strikethough' : ''} timendateGap`}>{list.date}</p>
                    <p className={`${list.status ? 'strikethough' : ''}`}>{list.time}</p>
                    <input type="checkbox" className="checkbox" checked={list.status} onChange={handleCheckboxChange} />
                </div>
            </div>
        </div>
    );
}

export default DisplayTodoList;

// task.id === list.id ? console.log('task.id=', task.id, 'list.id=', list.id) : 'not matched';
