import "./styles.css";
import React, { useState } from "react";

export default function App() {
	type Place = "home" | "outside" | "store";
	type Todo = Readonly<{
		text: string;
		done: boolean;
		place?: Place;
	}>;
	type AppProps = {
		text: string;
		done: boolean;
		place?: Place;
	}[];

	const initialTodoToday: AppProps = [
		{ text: "walk the dog", done: false, place: "outside" },
		{ text: "brush teeth", done: true, place: "home" }
	];

	const [newTodo, setNewTodo] = useState("");
	const [todoToday, setTodoToday] = useState(initialTodoToday);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setNewTodo(event.target.value);
	}

	function handleAdd(event?: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const newTodoToday = todoToday.concat({
			text: newTodo,
			done: false
		});
		setTodoToday(newTodoToday);
		setNewTodo("");
	}

	function clearTasks() {
		const clearedTodoToday: AppProps = [...todoToday];
		setTodoToday(clearedTodoToday.filter((task: Todo) => task.done === false));
	}

	function toggleDone(key: string) {
		const newTodoToday: AppProps = [];
		for (let i: number = 0; i < todoToday.length; i++) {
			if (todoToday[i].text === key) {
				newTodoToday[i] = { ...todoToday[i], done: !todoToday[i].done };
			} else {
				newTodoToday[i] = todoToday[i];
			}
		}
		setTodoToday(newTodoToday);
	}

	const List = (todoToday: AppProps) => (
		<div>
			<ul>
				{todoToday.map((task: Todo) => (
					<li
						style={task.done ? { textDecoration: "line-through" } : {}}
						onClick={() => toggleDone(task.text)}
					>
						{" "}
						{task.text}{" "}
					</li>
				))}
			</ul>
			<form onSubmit={handleAdd}>
				<input
					type="text"
					placeholder="new task"
					value={newTodo}
					onChange={handleChange}
				/>
				<button type="submit">Add</button>
				<button type="button" onClick={clearTasks}>
					Clear
				</button>
			</form>
		</div>
	);

	return (
		<div className="App">
			<h1>To Do List</h1>
			{List(todoToday)}
		</div>
	);
}
