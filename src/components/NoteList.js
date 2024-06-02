import React, { useState, useEffect } from 'react';
import { List, Button } from 'antd';
import Pagination from './Pagination';

const NoteList = ({ notes, deleteNote, currentPage, notesPerPage, setCurrentPage }) => {
    const [currentNotes, setCurrentNotes] = useState([]);

    useEffect(() => {
        const indexOfLastNote = currentPage * notesPerPage;
        const indexOfFirstNote = indexOfLastNote - notesPerPage;
        const slicedNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
        setCurrentNotes(slicedNotes);
    }, [notes, currentPage, notesPerPage]);

    const handlePaginate = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteNote = (id) => {
        deleteNote(id);

        if (currentNotes.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1); // Go back one page if no notes are left on the current page
        }
    };

    return (
        <div>
            <List
                itemLayout='horizontal'
                dataSource={currentNotes}
                renderItem={note => (
                    <List.Item
                        key={note.id}
                        actions={[<Button type='danger' 
                        onClick={() => handleDeleteNote(note.id)}>Delete</Button>]}  
                    >
                        <List.Item.Meta
                            title={note.title}
                            description={note.content}
                        />
                    </List.Item>
                )}
            />
            <Pagination
                currentPage={currentPage}
                notesPerPage={notesPerPage}
                totalNotes={notes.length}
                paginate={handlePaginate}
            />
        </div>
    );
};

export default NoteList;
