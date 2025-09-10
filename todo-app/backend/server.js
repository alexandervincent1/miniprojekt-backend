// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const todoRoutes = require('./routes/todos');
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors()); // Tillåt cross-origin requests
app.use(express.json()); // För att kunna tolka JSON i request body
// Databasanslutning
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Could not connect to MongoDB Atlas', err));
// API Routes
app.use('/api/todos', todoRoutes);
// Starta servern
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);

});