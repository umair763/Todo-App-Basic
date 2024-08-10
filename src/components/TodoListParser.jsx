import { useState } from 'react';
import DisplayTodoList from './DisplayTodoList';

function TodoListParser({ todolist, searched, setAllMarked, toggleTaskStatus }) {
    return (
        <>
            <div className="scrollableDiv">
                {searched !== null
                    ? searched.map((list, i) => (
                          <DisplayTodoList
                              list={list}
                              key={i}
                              id={i}
                              setAllMarked={setAllMarked}
                              toggleTaskStatus={toggleTaskStatus}
                          />
                      ))
                    : todolist.map((list, i) => (
                          <DisplayTodoList
                              list={list}
                              key={i}
                              id={i}
                              setAllMarked={setAllMarked}
                              toggleTaskStatus={toggleTaskStatus}
                          />
                      ))}
            </div>
        </>
    );
}

export default TodoListParser;
