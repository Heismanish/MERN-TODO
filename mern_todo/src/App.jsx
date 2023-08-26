import { useEffect, useState } from "react";
import "./App.css";
import EditForm from "./EditForm";

function App() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [todoList, setTodoList] = useState([]);
	const [isDeleted, setIsDeleted] = useState(false);
	const [edit, setEdit] = useState(false);
	const [updateId, seUpdateId] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			title: title,
			description: description,
		};
		const postTodo = async (data) => {
			try {
				const response = await fetch("http://localhost:3000/todos", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(data),
				});
				if (response.ok) {
					const newTodo = await response.json();
					console.log(newTodo);
					setTodoList([...todoList, newTodo]);
				} else {
					console.error("POST request failed with status:", response.status);
				}
			} catch (error) {
				console.error("Error fetching todos:", error);
			}
		};
		postTodo(data);
	};

	const editTodoHandle = (dataToUpdate) => {
		const putTodo = async (dataToUpdate) => {
			try {
				const response = await fetch(
					`http://localhost:3000/todos/${updateId}`,
					{
						method: "PUT",
						headers: { "content-type": "application/json" },
						body: JSON.stringify(dataToUpdate),
					}
				);
				if (response.ok) {
					const updatedTodo = await response.json();
					console.log(updatedTodo);
					setTodoList((prevTodoList) =>
						prevTodoList.map((todo) =>
							todo.id === updatedTodo.id ? updatedTodo : todo
						)
					);
					setEdit(false);
				} else {
					console.error("PUT request failed with status:", response.status);
					setEdit(false);
				}
			} catch (error) {
				setEdit(false);
				console.error("Error fetching todos:", error);
			}
		};
		putTodo(dataToUpdate);
	};

	const fetchTodoList = async () => {
		try {
			const response = await fetch("http://localhost:3000/todos");
			const todoList = await response.json();
			console.log(todoList);
			setTodoList(todoList);
		} catch (error) {
			console.error("Error fetching todos:", error);
		}
	};
	useEffect(() => {
		fetchTodoList();
	}, []);

	const deleteTodo = async (id) => {
		try {
			const response = await fetch(`http://localhost:3000/todos/${id}`, {
				method: "DELETE",
				headers: { "content-type": "application/json" },
			});

			if (response.ok) {
				// Delete successful; update the todoList state
				setTodoList((prevTodoList) => prevTodoList.filter((t) => t.id !== id));
				console.log(`Todo with ID ${id} deleted successfully.`);
			} else {
				// Delete request failed; handle the error
				console.error(
					`Failed to delete todo with ID ${id}. Status: ${response.status}`
				);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="min-h-screen  bg-gray-100 flex items-center flex-col  justify-center ">
			{edit ? (
				<EditForm todo={todoList} onSubmit={editTodoHandle} />
			) : (
				<form
					onSubmit={handleSubmit}
					className="space-y-4 max-w-md w-full bg-white p-8 rounded-lg shadow-lg"
				>
					<h1 className="text-2xl font-bold">Create Todo</h1>
					<div>
						<label htmlFor="title">Title</label>
						<input
							type="text"
							id="title"
							className="w-full border rounded p-2"
							placeholder="Title"
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>
					<div>
						<label htmlFor="description">Description</label>
						<input
							type="text"
							id="description"
							className="w-full border rounded p-2"
							placeholder="Description"
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
					>
						Add todo
					</button>
				</form>
			)}
			{todoList.map((t) => {
				return (
					<div
						key={t.id}
						className="bg-gray-200 p-4 my-4 rounded max-w-md w-full"
					>
						<div className="px-2">
							<h2 className="text-lg font-semibold">{t.title}</h2>
							<p>{t.description}</p>
						</div>
						<button
							className="bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2 hover:bg-green-600"
							onClick={() => {
								deleteTodo(t.id);
							}}
						>
							Delete
						</button>
						<button
							className="bg-blue-500 text-white py-1 px-2 rounded mt-2 ml-2 hover:bg-green-600"
							onClick={() => {
								deleteTodo(t.id);
							}}
						>
							Completed
						</button>
						<button
							className="bg-green-500 text-white py-1 px-2 rounded mt-2 ml-2 hover:bg-green-600"
							onClick={() => {
								seUpdateId(t.id);
								setEdit(!edit);
							}}
						>
							Update
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default App;
