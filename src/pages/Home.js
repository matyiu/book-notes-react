import React from 'react';
import { Navbar } from '../components/Navbar';
import { Toolbar } from '../components/Toolbar';

export const Home = () => {
    return (
        <div id="homepage">
            <Navbar />
            <Toolbar />
        {/* // TODO: NotesList */}
        </div>
    );
}