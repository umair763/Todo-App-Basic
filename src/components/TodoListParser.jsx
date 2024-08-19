import { useState } from 'react';
import DisplayTodoList from './DisplayTodoList';
 
function TodoListParser({ todolist, searched, newtask, marked, toggleTaskStatus }) {
    return (
        <> 
            <div className="scrollableDiv">
                {searched !== null
                    ? searched.map((list, i) => (
                          <DisplayTodoList
                              list={list}
                              key={i}
                              id={i}
                              newtask={newtask}
                              toggleTaskStatus={toggleTaskStatus}
                          />
                      ))
                    : todolist.map((list, i) => (
                          <DisplayTodoList
                              list={list}
                              key={i}
                              id={i}
                              newtask={newtask}
                              toggleTaskStatus={toggleTaskStatus}
                          />
                      ))}
            </div>
        </>
    );
}

export default TodoListParser;
