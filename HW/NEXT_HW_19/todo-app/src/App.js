import './App.css';
import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Luck from './components/Luck';
import picture1 from './diary.png';

function App() {
    const [todos, setTodos] = useState([]);

    // CREATE: 할 일 생성
    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };
    // UPDATE: 할 일 텍스트 수정
    const editTodo = (id, newText) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
    };

    // UPDATE: 할 일 완료여부 수정
    const completeTodo = (id) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo)));
    };

    // DELETE: 할 일 삭제하기
    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="App">
            <Luck />
            <img src={picture1}></img>
            <TodoForm addTodo={addTodo} />
            <TodoList todos={todos} completeTodo={completeTodo} editTodo={editTodo} removeTodo={removeTodo} />
        </div>
    );
}

export default App;
