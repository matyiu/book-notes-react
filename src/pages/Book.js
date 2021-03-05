import React from 'react';
import { Navbar } from '../components/Navbar';
import { SingleNote } from '../components/notes/SingleNote';

export const Book = () => {
    return (
        <div id="bookpage">
            <Navbar />
            <SingleNote />
        </div>
    );
}