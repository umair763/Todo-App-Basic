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

        // Format the date string into Pakistani format
        // const DateFormatted = formatDateToPakistani(date);

        const newTaskobj = {
            color,
            task,
            date,
            time,
            status: false,
        };

        console.log(newTaskobj);

        if (color !== '' && task !== '' && date !== '' && time !== '') {
            addTask(newTaskobj);
            setColor('');
            setTask('');
            // setDate('');
            // setTime('');
        }
    }

    return (
        <>
            <form className="addtask-form" onSubmit={handleform}>
                <label>Choose color</label>
                <select className="addentrysortby" value={color} onChange={(e) => setColor(e.target.value)}>
                    <option>set color</option>
                    <option>red</option>
                    <option>yellow</option>
                    <option>green</option>
                </select>

                <label>Write task</label>
                <input type="text" className="writeTask" value={task} onChange={(e) => setTask(e.target.value)} />

                <label>Set Date</label>
                <input
                    type="date"
                    // value={date}
                    className="settime"
                    onChange={(e) => setDate(formatDateToPakistani(e.target.value))}
                />

                <label>Set time</label>
                <input
                    type="time"
                    // value={time}
                    className="settime"
                    onChange={(e) => setTime(convertTo12HourFormat(e.target.value))}
                />

                <button className="confirmbtn">Confirm</button>
                <button className="closebtn" onClick={SetisAddFormVisible}>
                    Close
                </button>
            </form>
        </>
    );
}

export default AddTaskForm;
