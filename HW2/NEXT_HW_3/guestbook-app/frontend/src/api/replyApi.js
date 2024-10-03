// 답글 조회
export const fetchReplyEntries = async (guestbook_id) => {
    const response = await fetch(`http://localhost:3001/api/reply/${guestbook_id}`);
    return response.json();
};

// 답글 추가
export const addReplyEntry = async (guestbook_id, name, message, password) => {
    const response = await fetch('http://localhost:3001/api/reply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guestbook_id, name, message, password }),
    });
    return response.json();
};

// 답글 삭제
export const deleteReplyEntry = async (id, password) => {
    const response = await fetch(`http://localhost:3001/api/reply/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });
    return response.json();
};

// 답글 수정
export const editReplyEntry = async (id, message, password) => {
    const response = await fetch(`http://localhost:3001/api/reply/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, password }),
    });
    return response.json();
};
