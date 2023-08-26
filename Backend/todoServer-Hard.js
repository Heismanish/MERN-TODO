// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const port = 3000;
// const cors = require("cors");
// const mongoose = require("mongoose");

// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect("mongodb://localhost:27017/todos", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

// const TodoSchema = new mongoose.Schema({
// 	title: String,
// 	description: String,
// });

// const Todo = mongoose.model("Todo", TodoSchema);

// // Routes
// app.get("/todos", async (req, res) => {
// 	try {
// 		const todos = await Todo.find();
// 		res.json(todos);
// 	} catch (error) {
// 		res.status(500).json({ error: "Server error" });
// 	}
// });

// app.post("/todos", async (req, res) => {
// 	try {
// 		const newTodo = await Todo.create(req.body);
// 		res.status(201).json(newTodo);
// 	} catch (error) {
// 		res.status(500).json({ error: "Server error" });
// 	}
// });

// app.put("/todos/:id", async (req, res) => {
// 	try {
// 		const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
// 			new: true,
// 		});
// 		res.json(updatedTodo);
// 	} catch (error) {
// 		res.status(500).json({ error: "Server error" });
// 	}
// });

// app.delete("/todos/:id", async (req, res) => {
// 	try {
// 		await Todo.findByIdAndRemove(req.params.id);
// 		res.sendStatus(200);
// 	} catch (error) {
// 		res.status(500).json({ error: "Server error" });
// 	}
// });

// app.use((req, res, next) => {
// 	res.status(404).send();
// });

// app.listen(port, () => {
// 	console.log(`Example app listening on port ${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

// 1.
app.get("/todos", (req, res) => {
	fs.readFile("todos.json", "utf-8", (err, data) => {
		if (err) throw err;
		res.json(JSON.parse(data));
	});
});

// 2.
app.get("/todos/:id", (req, res) => {
	fs.readFile("todos.json", "utf-8", (err, data) => {
		if (err) throw err;
		const todos = JSON.parse(data);
		const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
		if (todoIndex === -1) {
			res.status(404).send();
		} else res.status(200).json(todos[todoIndex]);
	});
});

app.post("/todos", (req, res) => {
	const newTodo = {
		id: Math.floor(Math.random() * 100000),
		title: req.body.title,
		description: req.body.description,
	};
	fs.readFile("todos.json", "utf-8", (err, data) => {
		if (err) throw err;
		const todos = JSON.parse(data);
		todos.push(newTodo);
		fs.writeFile("todos.json", JSON.stringify(todos), "utf-8", (err) => {
			if (err) throw err;
			res.status(201).json(newTodo);
		});
	});
});

app.put("/todos/:id", (req, res) => {
	fs.readFile("todos.json", "utf-8", (err, data) => {
		if (err) throw err;
		const todos = JSON.parse(data);
		const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
		if (todoIndex == -1) {
			res.status(404).send();
		} else {
			todos[todoIndex].title = req.body.title;
			todos[todoIndex].description = req.body.description;
			fs.writeFile("todos.json", JSON.stringify(todos), "utf-8", (err) => {
				if (err) throw err;
				res.status(200).json(todos[todoIndex]);
			});
		}
	});
});

app.delete("/todos/:id", (req, res) => {
	fs.readFile("todos.json", "utf-8", (err, data) => {
		if (err) throw err;
		const todos = JSON.parse(data);
		const indexToDelete = todos.findIndex(
			(t) => t.id === parseInt(req.params.id)
		);
		if (indexToDelete === -1) {
			res.status(404).send();
		} else {
			todos.splice(indexToDelete, 1);
			fs.writeFile("todos.json", JSON.stringify(todos), "utf-8", (err) => {
				if (err) {
					throw err;
				}
				res.status(200).send(todos);
			});
		}
	});
});

app.use((req, res, next) => {
	res.status(404).send();
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

module.exports = app;
