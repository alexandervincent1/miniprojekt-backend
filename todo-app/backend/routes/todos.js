// backend/routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
// GET all todos
router.get('/', async (req, res) => {
const todos = await Todo.find().sort({ createdAt: -1 });
res.json(todos);
});
// POST a new todo
router.post('/', async (req, res) => {
const newTodo = new Todo({
text: req.body.text
});
const savedTodo = await newTodo.save();
res.status(201).json(savedTodo);
});
// PUT (update) a todo's completed status
router.put('/:id', async (req, res) => {
const todo = await Todo.findById(req.params.id);
todo.completed = !todo.completed; // Toggle the status
await todo.save();
res.json(todo);
});
// DELETE a todo

router.delete('/:id', async (req, res) => {
const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
res.json({ message: 'Todo deleted', id: deletedTodo._id });
});
module.exports = router;