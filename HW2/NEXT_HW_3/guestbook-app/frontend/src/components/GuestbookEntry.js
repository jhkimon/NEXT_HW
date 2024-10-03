import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { addEmotionEntry, deleteEmotionEntry, editEmotionEntry } from '../api/emotionApi';
import { fetchReplyEntries } from '../api/replyApi';
import { EMOTION_TYPES } from '../constant/constants';
import '../styles/GuestbookEntry.css';
import GuestbookReply from './GuestbookReply';

const emotionGifs = {
    HEART: '/emotion/heart.gif',
    LIKE: '/emotion/like.gif',
    CHECK: '/emotion/check.gif',
    LAUGH: '/emotion/laugh.gif',
    WOW: '/emotion/wow.gif',
    SAD: '/emotion/sad.gif',
};

const emotionImgs = {
    HEART: '/emotion/heart.png',
    LIKE: '/emotion/like.png',
    CHECK: '/emotion/check.png',
    LAUGH: '/emotion/laugh.png',
    WOW: '/emotion/wow.png',
    SAD: '/emotion/sad.png',
};

const GuestbookEntry = ({ entry, editEntry, deleteEntry, onPinToggle }) => {
    const [selectedEmotion, setSelectedEmotion] = useState(entry.emotion || null);
    const [showMenu, setShowMenu] = useState(false);
    const [replies, setReplies] = useState([]);

    // 댓글 데이터 로드
    useEffect(() => {
        fetchReplyEntries(entry.id).then((data) => setReplies(data));
    }, [entry.id]);

    // 감정 추가/수정/삭제 처리 함수
    const handleEmotionToggle = (emotionType) => {
        if (selectedEmotion === emotionType) {
            deleteEmotionEntry(entry.id).then(() => {
                setSelectedEmotion(null);
            });
        } else if (selectedEmotion) {
            editEmotionEntry(entry.id, emotionType).then(() => {
                setSelectedEmotion(emotionType);
            });
        } else {
            addEmotionEntry(entry.id, emotionType).then(() => {
                setSelectedEmotion(emotionType);
            });
        }
        setShowMenu(false);
    };

    return (
        <li className="guestbook-entry">
            <div className="entry-header">
                <div>
                    <strong>{entry.name}:</strong> {entry.message} <br />
                    <small className="created-at">{new Date(entry.created_at).toLocaleString()}</small>
                </div>
                <button className="menu-button" onClick={() => setShowMenu((prev) => !prev)}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </button>
            </div>

            {showMenu && (
                <div className="dropdown-menu">
                    <ul>
                        <li
                            onClick={() => {
                                editEntry(entry.id);
                                setShowMenu(false);
                            }}
                        >
                            방명록 수정하기
                        </li>
                        <li
                            onClick={() => {
                                deleteEntry(entry.id);
                                setShowMenu(false);
                            }}
                        >
                            방명록 삭제하기
                        </li>
                        <li
                            onClick={() => {
                                onPinToggle(entry.id);
                                setShowMenu(false);
                            }}
                        >
                            {entry.is_pinned ? '공지 내리기' : '공지 등록하기'}
                        </li>
                        <div className="emotion-list">
                            {Object.keys(EMOTION_TYPES).map((emotion) => (
                                <img
                                    key={emotion}
                                    src={emotionGifs[EMOTION_TYPES[emotion]]}
                                    alt={EMOTION_TYPES[emotion]}
                                    title={EMOTION_TYPES[emotion]}
                                    className={`emotion-icon ${
                                        selectedEmotion === EMOTION_TYPES[emotion] ? 'selected' : ''
                                    }`}
                                    onClick={() => {
                                        handleEmotionToggle(EMOTION_TYPES[emotion]);
                                        setShowMenu(false);
                                    }}
                                />
                            ))}
                        </div>
                    </ul>
                </div>
            )}

            {selectedEmotion && (
                <div className="selected-emotion" onClick={() => handleEmotionToggle(selectedEmotion)}>
                    <img src={emotionImgs[selectedEmotion]} alt={selectedEmotion} className="selected-emotion-icon" />
                    <span className="emotion-count">1</span>
                </div>
            )}

            <GuestbookReply entryId={entry.id} entryUser={entry.name} initialReplies={replies} />
        </li>
    );
};

export default GuestbookEntry;
