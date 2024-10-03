import React from 'react';
import GuestbookEntry from './GuestbookEntry';

const GuestbookList = ({ entries, editEntry, deleteEntry }) => {
    return (
        <ul>
            {entries.map((entry) => (
                <GuestbookEntry key={entry.id} entry={entry} editEntry={editEntry} deleteEntry={deleteEntry} />
            ))}
        </ul>
    );
};

export default GuestbookList;
