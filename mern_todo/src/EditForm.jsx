import React from "react";
import { useState } from "react";

function EditForm({ todo, onSubmit }) {
	const [editedTitle, setEditedTitle] = useState("");
	const [editedDescription, setEditedDescription] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const editedTodo = {
			title: editedTitle,
			description: editedDescription,
		};
		console.log(editedTodo);
		onSubmit(editedTodo);
	};

	return (
		// 	<form onSubmit={handleSubmit} className="space-y-4">
		// 	<h1 className="text-2xl font-bold">Create Todo</h1>
		// 	<div>
		// 		<label  >Title</label>
		// 		<input
		// 			type="text"
		// 			id="title"
		// 			className="w-full border rounded p-2"
		// 			placeholder="Title"
		// 			onChange={(e) => setTitle(e.target.value)}
		// 			required
		// 		/>
		// 	</div>
		// 	<div>
		// 		<label htmlFor="description">Description</label>
		// 		<input
		// 			type="text"
		// 			id="description"
		// 			className="w-full border rounded p-2"
		// 			placeholder="Description"
		// 			onChange={(e) => setDescription(e.target.value)}
		// 			required
		// 		/>
		// 	</div>
		// 	<button
		// 		type="submit"
		// className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
		// 	>
		// 		Add todo
		// 	</button>
		// </form>
		<div>
			<form
				onSubmit={handleSubmit}
				className="space-y-4 max-w-md w-full bg-white p-8 rounded-lg shadow-lg "
			>
				<h1 className="text-2xl font-bold">Update Todo</h1>
				<div>
					<label htmlFor="title"> Title</label>
					<input
						type="text"
						placeholder="Title"
						className="w-full border rounded p-2"
						onChange={(e) => {
							setEditedTitle(e.target.value);
							// console.log(e.target.value);
						}}
						required
					></input>
				</div>
				<div>
					<label htmlFor="title"> Description</label>
					<input
						type="text"
						placeholder="Description"
						className="w-full border rounded p-2"
						onChange={(e) => {
							setEditedDescription(e.target.value);
						}}
						required
					></input>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
				>
					{" "}
					Update todo
				</button>
			</form>
		</div>
	);
}

export default EditForm;
