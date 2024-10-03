import React, { useState, useEffect } from 'react';
import GuestbookEntry from './components/GuestbookEntry';
import GuestbookForm from './components/GuestbookForm';
import Announcement from './components/Announcement';
import { fetchGuestbookEntries, addGuestbookEntry, deleteGuestbookEntry, editGuestbookEntry } from './api/guestbookApi';
import { fetchPinnedEntry, editPinnedEntry } from './api/pinnedApi';
import './styles/App.css';

function App() {
    const [guestbookEntries, setGuestbookEntries] = useState([]);
    const [pinnedEntry, setPinnedEntry] = useState(null);

    // 방명록 및 공지사항 데이터 로드
    useEffect(() => {
        fetchGuestbookEntries().then(setGuestbookEntries);
        fetchPinnedEntry().then((data) => {
            if (data.length > 0) setPinnedEntry(data[0]);
        });
    }, []);

    // 방명록 항목 추가 함수
    const handleAddEntry = (newEntry) => {
        addGuestbookEntry(newEntry).then((entry) => {
            setGuestbookEntries([entry, ...guestbookEntries]);
        });
    };

    // 방명록 항목 수정 함수
    const handleEditEntry = (id) => {
        const newMessage = prompt('수정할 메시지를 입력하세요:');
        const userPassword = prompt('비밀번호를 입력하세요:');
        if (newMessage && userPassword) {
            editGuestbookEntry(id, newMessage, userPassword).then((response) => {
                if (response.error) {
                    alert(response.error);
                } else {
                    setGuestbookEntries(
                        guestbookEntries.map((entry) =>
                            entry.id === id ? { ...entry, message: response.message } : entry
                        )
                    );
                }
            });
        }
    };

    // 방명록 항목 삭제 함수
    const handleDeleteEntry = (id) => {
        const userPassword = prompt('비밀번호를 입력하세요:');
        if (userPassword) {
            deleteGuestbookEntry(id, userPassword).then((response) => {
                if (response.error) {
                    alert(response.error);
                } else {
                    setGuestbookEntries(guestbookEntries.filter((entry) => entry.id !== id));
                }
            });
        }
    };

    // 공지 등록 및 해제 처리 함수
    const handlePinToggle = (entryId) => {
        // 새로운 공지가 설정되면 기존 공지 해제
        const updatedEntries = guestbookEntries.map((entry) => {
            if (entry.id === entryId) {
                const isCurrentlyPinned = entry.is_pinned;
                editPinnedEntry(entryId, !isCurrentlyPinned); // 서버 업데이트
                return { ...entry, is_pinned: !isCurrentlyPinned };
            }
            // 다른 항목은 공지 해제
            return { ...entry, is_pinned: false };
        });

        setGuestbookEntries(updatedEntries);

        // 공지가 설정되면 pinnedEntry 업데이트, 해제되면 null로 설정
        const newPinnedEntry = updatedEntries.find((entry) => entry.id === entryId && entry.is_pinned);
        setPinnedEntry(newPinnedEntry || null);
    };

    return (
        <div className="App">
            <Announcement pinnedMessage={pinnedEntry} />
            <h1>🎙️ 질문 게시판</h1>
            <GuestbookForm addEntry={handleAddEntry} />
            <ul>
                {guestbookEntries.map((entry) => (
                    <GuestbookEntry
                        key={entry.id}
                        entry={entry}
                        editEntry={handleEditEntry}
                        deleteEntry={handleDeleteEntry}
                        onPinToggle={handlePinToggle}
                    />
                ))}
            </ul>
        </div>
    );
}

export default App;
