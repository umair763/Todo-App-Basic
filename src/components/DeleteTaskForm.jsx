import { useState } from "react";
import "./styles/DeleteTaskForm.css";
 
function DeleteTaskForm({ setisDeleteFormVisible, deleteTask }) {
	const [Deltask, setDelTask] = useState("");
	const [DelColor, setDelColor] = useState("");
	const [DelDate, setDelDate] = useState("");
	const [Deltime, setDeltime] = useState("");

	function convertTo12HourFormat(time) {
		// Split the time into hours and minutes
		let [hours, minutes] = time.split(":");

		// Convert hours to a number
		hours = parseInt(hours);

		// Determine AM or PM suffix
		const ampm = hours >= 12 ? "PM" : "AM";

		// Convert hours from 24-hour format to 12-hour format
		hours = hours % 12 || 12;

		// Return the formatted time
		return `${hours}:${minutes} ${ampm}`;
	}

	function handleform(e) {
		e.preventDefault();
		if (DelColor !== "" && DelDate !== "" && Deltask !== "" && Deltime !== "") {
			deleteTask(Deltask);
            setDelColor("");
			setDelTask("");
            setDelDate("");
            setDeltime("");
		}
	}

	return (
		<>
			<form
				className="addtask-form2"
				onSubmit={handleform}>
				<label>Enter color</label>
				<select
					className="addentrysortby2"
                    value={DelColor}
					onChange={(e) => setDelColor(e.target.value)} >
					<option>Enter color</option>
					<option>red</option>
					<option>yellow</option>
					<option>green</option>
				</select>

				<label>Enter task</label>
				<input
					type="text"
					className="writeTask2"
                    value={Deltask}
					onChange={(e) => setDelTask(e.target.value)}
				/>

				<label>Enter Date</label>
				<input
					type="date"
					className="settime2"
                    value={DelDate}
					onChange={(e) => setDelDate(e.target.value)}
				/>

				<label>Enter time</label>
				<input
					type="time"
					className="settime2"
                    value={Deltime}
					onChange={(e) => setDeltime(e.target.value)}
				/>

				<button className="confirmbtn2">Confirm</button>
				<button
					className="closebtnn"
					onClick={setisDeleteFormVisible}>
					Close
				</button>
			</form>
		</>
	);
}

export default DeleteTaskForm;
