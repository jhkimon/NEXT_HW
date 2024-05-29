import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, completeTodo, editTodo, removeTodo }) => {
    return (
        <div>
            {todos.map((todo, index) => (
                <TodoItem
                    key={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    editTodo={editTodo}
                    removeTodo={removeTodo}
                />
            ))}
        </div>
    );
};

export default TodoList;
