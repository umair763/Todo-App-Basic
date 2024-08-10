import { useState } from 'react';
import './styles/DisplayTodoList.css';

function DisplayTodoList({ list, setAllMarked }) {
    const [marked, setMarked] = useState(false);
	
    function handleMarked() {
        setMarked((prev) => !prev);
        toggleTaskStatus(list.task); // Toggle the status in the main list
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
                <p className={`time ${marked ? 'strikethough' : ''}`}>{list.task}</p>
                <div className="time">
                    <p className={`${marked ? 'strikethough' : ''} timendateGap`}>{list.date}</p>
                    <p className={`${marked ? 'strikethough' : ''}`}>{list.time}</p>
                    <input type="checkbox" className="checkbox" onClick={handleMarked} />
                </div>
            </div>
        </div>
    );
}

export default DisplayTodoList;
