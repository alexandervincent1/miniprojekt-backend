<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
// Backend API URL

const API_URL = 'http://localhost:3000/api/todos';
// Reaktiva variabler för state
const todos = ref([]);
const newTodoText = ref('');

// Hämta alla todos när komponenten laddas
onMounted(async () => {
try {
const response = await axios.get(API_URL);
todos.value = response.data;
} catch (error) {
console.error('Error fetching todos:', error);
}
});

// Funktion för att lägga till en ny todo
async function addTodo() {
if (newTodoText.value.trim() === '') return;
try {
const response = await axios.post(API_URL, { text: newTodoText.value });
todos.value.unshift(response.data); // Lägg till den nya längst fram
newTodoText.value = ''; // Rensa input-fältet
} catch (error) {
console.error('Error adding todo:', error);
}
}
// Funktion för att växla en todos 'completed'-status
async function toggleCompleted(todo) {

try {
const response = await axios.put(`${API_URL}/${todo._id}`);
const index = todos.value.findIndex(t => t._id === todo._id);
if (index !== -1) {
todos.value[index].completed = response.data.completed;
}
} catch (error) {
console.error('Error updating todo:', error);
}
}
// Funktion för att ta bort en todo
async function deleteTodo(id) {
try {
await axios.delete(`${API_URL}/${id}`);
todos.value = todos.value.filter(todo => todo._id !== id);
} catch (error) {
console.error('Error deleting todo:', error);
}
}
</script>
<template>
<main class="app">
<h1>My To-Do List</h1>
<form @submit.prevent="addTodo" class="todo-form">
<input
type="text"
v-model="newTodoText"
placeholder="What needs to be done?" />

<button type="submit">Add Todo</button>
</form>
<ul class="todo-list">
<li v-for="todo in todos" :key="todo._id" :class="{ completed: todo.completed }">
<span @click="toggleCompleted(todo)" class="todo-text">
{{ todo.text }}
</span>
<button @click="deleteTodo(todo._id)" class="delete-btn">X</button>
</li>
</ul>
</main>
</template>
<style scoped>
.app {
max-width: 600px;
padding: 20px;
margin-left: 435px;
margin-bottom: 150px;
border-radius: 8px;
box-shadow: 0 2px 10px rgba(0,0,0,0.1);
font-family: sans-serif;
}
h1 {
text-align: center;
}
.todo-form {
display: flex;
margin-bottom: 10px;


}

.todo-form input {
flex-grow: 1;
padding: 10px;
border: 1px solid #ccc;
border-radius: 4px;
}
.todo-form button {
padding: 10px 15px;
margin-left: 10px;
border: none;
background-color: #42b983;
color: white;
border-radius: 4px;
cursor: pointer;
}
.todo-list {
list-style: none;
padding: 0;
}
.todo-list li {
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px;
border-bottom: 1px solid #eee;
}
.todo-text {

cursor: pointer;
}
.todo-list li.completed .todo-text {
text-decoration: line-through;
color: #999;
}
.delete-btn {
background-color: #e74c3c;
color: white;
border: none;
border-radius: 50%;
width: 25px;
height: 25px;
cursor: pointer;
}
</style>