import { useState } from 'react';
import './App.css';
import TodoListParser from './components/TodoListParser';
import AddTask from './components/AddTask';
import AddTaskForm from './components/AddTaskForm';
import DeleteTaskForm from './components/DeleteTaskForm';

const todolist = [
    {
        color: 'yellow',
        task: 'Demo Task',
        date: '2024-07-21',
        date: '21-07-2024',
        time: '10:00 AM',
        status: false,
    },
    {
        color: 'yellow',
        task: 'UI/UX Design Meeting (Demo)',
        date: '22-08-2024',
        time: '11:00 AM',
        status: false,
    },
    {
        color: 'green',
        task: 'Project Component Development (Demo)',
        date: '12-09-2024',
        time: '05:00 AM',
        status: false,
    },
    {
        color: 'red',
        task: 'Project Component  (Demo)',
        date: '04-09-2024',
        time: '09:00 AM',
        status: false,
    },
    {
        color: 'green',
        task: 'Development (Demo)',
        date: '04-09-2024',
        time: '01:00 PM',
        status: false,
    },
    {
        color: 'green',
        task: 'Development (Demo)',
        date: '11-07-2024',
        time: '11:00 AM',
        status: false,
    },
];

function App() {
    const [isAddFormVisible, setisAddFormVisible] = useState(false);
    const [isDeleteFormVisible, setisDeleteFormVisible] = useState(false);
    const [newtask, setAddNewTask] = useState(todolist);
    const [sortby, setSortBy] = useState('sortby');
    const [searchtask, setSearchTask] = useState('');

    function handleisAddFormVisible() {
        setisAddFormVisible((x) => !x);
        isDeleteFormVisible ? setisDeleteFormVisible(false) : '';
    }

    function handleisDeleteFormVisible() {
        setisDeleteFormVisible((x) => !x);
        isAddFormVisible ? setisAddFormVisible(false) : '';
    }

    function handleAddNewTasks(task) {
        setAddNewTask((newtask) => [...newtask, task]);
    }

    function handleDeleteTask(task) {
        setAddNewTask(newtask.filter((el) => el.task !== task));
    }

    function toggleTaskStatus(taskName) {
        setAddNewTask((prevTasks) =>
            prevTasks.map((task) => (task.task === taskName ? { ...task, status: !task.status } : task))
        );
    }

    let sorted = [...newtask];
    if (sortby === 'Task') {
        sorted = sorted.slice().sort((a, b) => a.task.localeCompare(b.task));
    }

    if (sortby === 'Important') {
        sorted = sorted.slice().sort((a, b) => {
            // First, compare the dates (convert to Date objects for accurate comparison)
            const dateA = new Date(a.date.split('-').reverse().join('-'));
            const dateB = new Date(b.date.split('-').reverse().join('-'));
            const dateComparison = dateA - dateB;

            if (dateComparison !== 0) {
                return dateComparison;
            }

            // If the dates are the same, compare the times
            const [timeA, modifierA] = a.time.split(' ');
            const [hoursA, minutesA] = timeA.split(':');
            const hours24A = (modifierA === 'PM' ? parseInt(hoursA, 10) + 12 : parseInt(hoursA, 10)) % 24;

            const [timeB, modifierB] = b.time.split(' ');
            const [hoursB, minutesB] = timeB.split(':');
            const hours24B = (modifierB === 'PM' ? parseInt(hoursB, 10) + 12 : parseInt(hoursB, 10)) % 24;

            const timeAInMinutes = hours24A * 60 + parseInt(minutesA, 10);
            const timeBInMinutes = hours24B * 60 + parseInt(minutesB, 10);

            return timeAInMinutes - timeBInMinutes;
        });
        // Set the color of the topmost task to 'red'
        if (sorted.length > 0) {
            sorted[0].color = 'red';
        }
    }

    let searched = sorted;
    if (searchtask) {
        searched = sorted.filter((el) => el.task.toLowerCase().includes(searchtask.toLowerCase()));
    }

    function toggleTaskStatus(taskName) {
        setAddNewTask((prevTasks) =>
            prevTasks.map((task) => (task.task === taskName ? { ...task, status: !task.status } : task))
        );
    }

    function handleAllMarkedDelete() {
        setAddNewTask((Tasks) => Tasks.filter((el) => !el.status));
    }

    return (
        <>
            <div className="backgroundForm">
                <div className="grid">
                    <div className="div-1">
                        <div className="text">
                            <h1>Todo App</h1>
                            <h3>To-Do lists help us break life into small steps.</h3>
                        </div>
                        <AddTask
                            SetisAddFormVisible={handleisAddFormVisible}
                            setisDeleteFormVisible={handleisDeleteFormVisible}
                            setSort={setSortBy}
                            setSearch={setSearchTask}
                            DeleteAllMarked={handleAllMarkedDelete}
                        />
                        <TodoListParser
                            todolist={sorted}
                            searched={searched}
                            toggleTaskStatus={toggleTaskStatus}
                            newtask={newtask}
                        />
                    </div>
                    <div className="respovsive">
                        <div className="right-side">
                            {isAddFormVisible ? (
                                <AddTaskForm addTask={handleAddNewTasks} SetisAddFormVisible={handleisAddFormVisible} />
                            ) : (
                                ''
                            )}
                            {isDeleteFormVisible ? (
                                <DeleteTaskForm
                                    deleteTask={handleDeleteTask}
                                    setisDeleteFormVisible={handleisDeleteFormVisible}
                                />
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
