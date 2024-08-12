import { useState } from 'react';
import './styles/AddTask.css';
 
function AddTask({ SetisAddFormVisible, setisDeleteFormVisible, setSort, setSearch, DeleteAllMarked }) {
    return (
        <>
            <div className="Addtaskcontainer">
                <p>🔴🟡🟢</p>
                <input
                    type="text"
                    className="searchbar"
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select className="sortby" onChange={(e) => setSort(e.target.value)}>
                    <option>Sort by</option>
                    <option>Task</option>
                    <option>Time</option>
                </select>
            </div>
            <div className="buttons">
                <button className="addbtn" onClick={SetisAddFormVisible}>
                    Add Task
                </button>
                <button className="deletebtn" onClick={setisDeleteFormVisible}>
                    Delete Task
                </button>
                <button
                    style={{ marginLeft: '12px', marginRight: '-22px' }}
                    className="deletebtn"
                    onClick={DeleteAllMarked}
                >
                    Delete All Marked
                </button>
            </div>
        </>
    );
}

export default AddTask;
