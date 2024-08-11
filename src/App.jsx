import { useState } from 'react';
import './App.css';
import TodoListParser from './components/TodoListParser';
import AddTask from './components/AddTask';
import AddTaskForm from './components/AddTaskForm';
import DeleteTaskForm from './components/DeleteTaskForm';

const todolist = [
    {
        color: 'red',
        task: 'Demo Task',
        date: '2024-07-21',
        time: '10:00 am',
        status: false,
    },
    {
        color: 'yellow',
        task: 'UI/UX Design Meeting (Demo)',
        date: '2024-08-22',
        time: '11:00 am',
        status: false,
    },
    {
        color: 'green',
        task: 'Project Component Development (Demo)',
        date: '2024-09-12',
        time: '05:00 pm',
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

    if (sortby === 'time') {
        sorted = sorted.slice().sort((a, b) => a.time.localeCompare(b.time));
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
        </>
    );
}

export default App;
