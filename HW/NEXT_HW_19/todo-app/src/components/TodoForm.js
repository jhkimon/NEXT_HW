import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({
            id: Math.floor(Math.random() * 10000),
            text: input,
            isComplete: false,
        });
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                placeholder="할 일을 입력해주세요."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
            />
            <button type="submit">할일 등록하기</button>
        </form>
    );
};

export default TodoForm;
