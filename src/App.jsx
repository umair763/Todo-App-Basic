import React, { useState, useEffect } from 'react';
import './App.css';
import TodoListParser from './components/TodoListParser';
import AddTask from './components/AddTask';
import AddTaskForm from './components/AddTaskForm';
import DeleteTaskForm from './components/DeleteTaskForm';

function App() {
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isDeleteFormVisible, setIsDeleteFormVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [sortby, setSortBy] = useState('sortby');
    const [searchTask, setSearchTask] = useState('');

    // Fetch tasks
    useEffect(() => {
        fetch('/api/tasks')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => setTasks(data)) // Assuming data is an array of tasks from the database
            .catch((err) => console.error('Error fetching tasks:', err));
    }, []);

    const handleIsAddFormVisible = () => {
        setIsAddFormVisible((prev) => !prev);
        if (isDeleteFormVisible) {
            setIsDeleteFormVisible(false);
        }
    };

    const handleIsDeleteFormVisible = () => {
        setIsDeleteFormVisible((prev) => !prev);
        if (isAddFormVisible) {
            setIsAddFormVisible(false);
        }
    };

    const handleAddNewTask = (task) => {
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to add task');
                }
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    setTasks((prevTasks) => [...prevTasks, task]);
                }
            })
            .catch((err) => console.error('Error adding task:', err));
    };

    const handleDeleteTask = (taskName) => {
        setTasks(tasks.filter((task) => task.task !== taskName));
    };

    const toggleTaskStatus = (taskName) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.task === taskName ? { ...task, status: !task.status } : task))
        );
    };

    let sortedTasks = [...tasks];
    if (sortby === 'Task') {
        sortedTasks.sort((a, b) => a.task.localeCompare(b.task));
    }

    if (sortby === 'Important') {
        sortedTasks.sort((a, b) => {
            const dateA = new Date(a.date.split('-').reverse().join('-'));
            const dateB = new Date(b.date.split('-').reverse().join('-'));
            const dateComparison = dateA - dateB;

            if (dateComparison !== 0) {
                return dateComparison;
            }

            const timeToMinutes = (time) => {
                const [timePart, modifier] = time.split(' ');
                let [hours, minutes] = timePart.split(':').map(Number);
                if (modifier === 'PM' && hours !== 12) hours += 12;
                if (modifier === 'AM' && hours === 12) hours = 0;
                return hours * 60 + minutes;
            };

            return timeToMinutes(a.time) - timeToMinutes(b.time);
        });

        if (sortedTasks.length > 0) {
            sortedTasks[0].color = 'red';
        }
    }

    let searchedTasks = sortedTasks;
    if (searchTask) {
        searchedTasks = sortedTasks.filter((task) => task.task.toLowerCase().includes(searchTask.toLowerCase()));
    }

    const handleAllMarkedDelete = () => {
        setTasks(tasks.filter((task) => !task.status));
    };

    return (
        <div className="backgroundForm">
            <div className="grid">
                <div className="div-1">
                    <div className="text">
                        <h1>Todo App</h1>
                        <h3>To-Do lists help us break life into small steps.</h3>
                    </div>
                    <AddTask
                        SetisAddFormVisible={handleIsAddFormVisible}
                        setisDeleteFormVisible={handleIsDeleteFormVisible}
                        setSort={setSortBy}
                        setSearch={setSearchTask}
                        DeleteAllMarked={handleAllMarkedDelete}
                    />
                    <TodoListParser
                        todolist={sortedTasks}
                        searched={searchedTasks}
                        toggleTaskStatus={toggleTaskStatus}
                        newtask={tasks}
                    />
                </div>
                <div className="responsive">
                    <div className="right-side">
                        {isAddFormVisible && (
                            <AddTaskForm addTask={handleAddNewTask} SetisAddFormVisible={handleIsAddFormVisible} />
                        )}
                        {isDeleteFormVisible && (
                            <DeleteTaskForm
                                deleteTask={handleDeleteTask}
                                setisDeleteFormVisible={handleIsDeleteFormVisible}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
