export const fetchGuestbookEntries = async () => {
    const response = await fetch('http://localhost:3001/api/guestbook');
    return response.json();
};

export const addGuestbookEntry = async (entry) => {
    const response = await fetch('http://localhost:3001/api/guestbook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    return response.json();
};

export const deleteGuestbookEntry = async (id, password) => {
    const response = await fetch(`http://localhost:3001/api/guestbook/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });
    return response;
};

export const editGuestbookEntry = async (id, message, password) => {
    const response = await fetch(`http://localhost:3001/api/guestbook/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, password }),
    });
    return response.json();
};
