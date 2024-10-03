// 상단고정 조회
export const fetchPinnedEntry = async () => {
    const response = await fetch(`http://localhost:3001/api/guestbook/pin`);
    return response.json();
};

// 상단고정 수정
export const editPinnedEntry = async (id, is_pinned) => {
    const response = await fetch(`http://localhost:3001/api/guestbook/pin/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_pinned }),
    });

    if (!response.ok) {
        throw new Error('Failed to update pinned entry');
    }

    return response.json();
};
