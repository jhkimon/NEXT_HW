import React, { useState, useEffect } from 'react';
import { fetchReplyEntries, addReplyEntry, deleteReplyEntry, editReplyEntry } from '../api/replyApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/GuestbookReply.css';

const GuestbookReply = ({ entryId, entryUser, initialReplies }) => {
    const [replies, setReplies] = useState(initialReplies || []);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchReplyEntries(entryId).then(setReplies);
    }, [entryId]);

    const handleAddReply = () => {
        if (replyText.trim() && name.trim()) {
            addReplyEntry(entryId, name, replyText, password).then((newReply) => {
                setReplies([...replies, newReply]);
                setReplyText('');
                setName('');
                setPassword('');
                setShowReplyInput(false);
            });
        }
    };

    // 댓글 삭제 함수
    const handleDeleteReply = (replyId) => {
        const userPassword = prompt('비밀번호를 입력하세요:');
        if (userPassword) {
            deleteReplyEntry(replyId, userPassword).then((response) => {
                if (response.error) {
                    alert(response.error);
                } else {
                    setReplies(replies.filter((reply) => reply.id !== replyId));
                }
            });
        }
    };

    return (
        <div className="guestbook-reply">
            <ul className="replies-list">
                {replies &&
                    replies.map((reply) => (
                        <li key={reply.id} className="reply-item">
                            <span>
                                <strong>{reply.name}:</strong> {reply.message}
                            </span>

                            <button className="delete-reply-button" onClick={() => handleDeleteReply(reply.id)}>
                                <FontAwesomeIcon icon={faTrash} className="delete-icon" />{' '}
                            </button>
                        </li>
                    ))}
            </ul>

            <button className="reply-button" onClick={() => setShowReplyInput(!showReplyInput)}>
                {showReplyInput ? '댓글 취소' : '댓글'}
            </button>

            {showReplyInput && (
                <div className="reply-input">
                    <div className="reply-user">Reply to: {entryUser}</div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="작성자 이름"
                        required
                    />
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호"
                        required
                    />
                    <button className="save-reply-button" onClick={handleAddReply}>
                        댓글 저장
                    </button>
                </div>
            )}
        </div>
    );
};

export default GuestbookReply;
