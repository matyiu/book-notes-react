import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from '../components/Navbar';
import { NotesList } from '../components/notes/NotesList';
import { Toolbar } from '../components/Toolbar';

export const Home = () => {
    // Redux Selectors
    const notesDefault = useSelector(status => status.notes);

    // React State
    const [ notes, setNotes ] = useState(notesDefault);

    const handleSearchNotes = (e) => {
        setNotes(notesDefault.filter(
            note => note.name.startsWith(e.target.value)));
    }

    return (
        <div id="homepage">
            <Navbar onSearch={handleSearchNotes} />
            <Toolbar />
            <NotesList notesDefault={notesDefault} notes={notes} />
        </div>
    );
}