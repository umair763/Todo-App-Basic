import { useState } from "react";
import DisplayTodoList from "./DisplayTodoList";

function TodoListParser({ todolist, searched }) {
	return (
		<>
			<div className="scrollableDiv">
				{searched !== null
					? searched.map((list, i) => (
							<DisplayTodoList
								list={list}
								key={i}
								id={i}
							/>
					  ))
					: todolist.map((list, i) => (
							<DisplayTodoList
								list={list}
								key={i}
								id={i}
							/>
					  ))}
			</div>
		</>
	);
}

export default TodoListParser;
