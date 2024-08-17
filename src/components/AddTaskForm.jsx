import { useState } from 'react';
import './styles/AddTaskForm.css';

function AddTaskForm({ SetisAddFormVisible, addTask }) {
    const [color, setColor] = useState('');
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    function convertTo12HourFormat(time) {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    }

    function formatDateToPakistani(date) {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    }

    function handleform(e) {
        e.preventDefault();

        const newTaskobj = {
            color,
            task,
            date: formatDateToPakistani(date),
            time: convertTo12HourFormat(time),
            status: false,
        };

        if (color && task && date && time) {
            addTask(newTaskobj); // Send the new task to the parent function to handle the database addition
            setColor('');
            setTask('');
            setDate('');
            setTime('');
        }
    }

    return (
        <form className="addtask-form" onSubmit={handleform}>
            <label>Choose color</label>
            <select className="addentrysortby" value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="">Set color</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
            </select>

            <label>Write task</label>
            <input type="text" className="writeTask" value={task} onChange={(e) => setTask(e.target.value)} />

            <label>Set Date</label>
            <input type="date" className="settime" value={date} onChange={(e) => setDate(e.target.value)} />

            <label>Set time</label>
            <input type="time" className="settime" value={time} onChange={(e) => setTime(e.target.value)} />

            <button className="confirmbtn" type="submit">
                Confirm
            </button>
            <button className="closebtn" onClick={SetisAddFormVisible}>
                Close
            </button>
        </form>
    );
}

export default AddTaskForm;
