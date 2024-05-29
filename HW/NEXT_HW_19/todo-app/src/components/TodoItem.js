import React, { useState } from 'react';

const TodoItem = ({ todo, completeTodo, editTodo, removeTodo }) => {
    const [mode, setMode] = useState('READ');
    const [text, setText] = useState(todo.text);

    const handleUpdate = () => {
        editTodo(todo.id, text);
        setMode('READ');
    };

    return (
        <div>
            <input type="checkbox" checked={todo.isComplete} onChange={() => completeTodo(todo.id)} />
            {mode === 'READ' ? (
                <>
                    <span>{todo.text}</span>
                    <button onClick={() => setMode('UPDATE')}>수정하기</button>
                    <button onClick={() => removeTodo(todo.id)}>삭제하기</button>
                </>
            ) : (
                <>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                    <button onClick={handleUpdate}>저장</button>
                    <button onClick={() => setMode('READ')}>돌아가기</button>
                </>
            )}
        </div>
    );
};

export default TodoItem;
