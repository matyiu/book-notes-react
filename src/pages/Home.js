import React from 'react';
import { Navbar } from '../components/Navbar';
import { NotesList } from '../components/notes/NotesList';
import { Toolbar } from '../components/Toolbar';

export const Home = () => {
    return (
        <div id="homepage">
            <Navbar />
            <Toolbar />
            <NotesList />
        </div>
    );
}