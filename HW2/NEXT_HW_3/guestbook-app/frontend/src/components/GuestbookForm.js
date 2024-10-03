import React, { useState } from 'react';

const GuestbookForm = ({ addEntry }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addEntry({ name, message, password });
        setName('');
        setMessage('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} required />
            <textarea placeholder="메시지" value={message} onChange={(e) => setMessage(e.target.value)} required />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">남기기</button>
        </form>
    );
};

export default GuestbookForm;
