export const addEmotionEntry = async (message_id, emotion_type) => {
    const response = await fetch('http://localhost:3001/api/guestbook/emotion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message_id, emotion_type }),
    });

    return response.json();
};

export const deleteEmotionEntry = async (message_id) => {
    const response = await fetch(`http://localhost:3001/api/guestbook/emotion/${message_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return {}; // 응답이 비어있을 때 빈 객체 반환
    }

    try {
        return await response.json();
    } catch (error) {
        console.error('Failed to parse response as JSON', error);
        return {};
    }
};

export const editEmotionEntry = async (message_id, emotion_type) => {
    const response = await fetch(`http://localhost:3001/api/guestbook/emotion/${message_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emotion_type }), // 감정 상태 업데이트
    });

    return response.json();
};
