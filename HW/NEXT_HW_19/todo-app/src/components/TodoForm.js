import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

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
            <span class="todo-today">오늘 한 일 </span>
            <input
                type="text"
                placeholder="오늘은 어떤 일이 있었나요?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
            />
            <button type="submit" className="todo-submit">
                {' '}
                <FontAwesomeIcon className="arrow" icon={faArrowAltCircleRight} />
                할일 등록하기
            </button>
        </form>
    );
};

export default TodoForm;
