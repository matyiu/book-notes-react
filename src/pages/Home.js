import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from '../components/Navbar';
import { NotesList } from '../components/notes/NotesList';
import { Toolbar } from '../components/Toolbar';

export const Home = () => {
    // Redux Selectors
    const notesDefault = useSelector(status => status.notes);

    // React State
    const [ notes, setNotes ] = useState(notesDefault);

    // Refs
    const firstRender = useRef(true);

    // Helper functions
    const orderBy = {
        "alphabetically": (unorderedArr, type) => {
            if (type === 'ascending') {
                return [...unorderedArr].sort((a, b) => {
                    const aName = a.name.toLowerCase();
                    const bName = b.name.toLowerCase();
    
                    if (aName[0] > bName[0]) {
                        return 1;
                    } else if (aName[0] < bName[0]) {
                        return -1;
                    }
    
                    return 0;
                });
            } else if (type === 'descending') {
                return [...unorderedArr].sort((a, b) => {
                    const aName = a.name.toLowerCase();
                    const bName = b.name.toLowerCase();

                    if (aName[0] < bName[0]) {
                        return 1;
                    } else if (aName[0] > bName[0]) {
                        return -1;
                    }
    
                    return 0;
                });
            }
        },
        "created": (unorderedArr, type) => {
            if (type === 'ascending') {
                return [...unorderedArr].sort((a, b) => {
                    if (a.created > b.created) {
                        return 1;
                    } else if (a.created < b.created) {
                        return -1;
                    }

                    return 0;
                });
            }
            if (type === 'descending') {
                return [...unorderedArr].sort((a, b) => {
                    if (a.created < b.created) {
                        return 1;
                    } else if (a.created > b.created) {
                        return -1;
                    }

                    return 0;
                });
            }
        }
    }

    const findItem = (arr, value) => 
        arr.findIndex(item => item === value) > -1;

    const findState = (state, noteState) => state === noteState;

    // Event Handlers
    const handleSearchNotes = (e) => {
        setNotes(notesDefault.filter(
            note => note.name.startsWith(e.target.value)));
    }
    const handleOrderByNotes = (order, type) => {
        setNotes(orderBy[order.toLowerCase()](notes, type.toLowerCase()));
    }
    const handleFilter = ({ authors, categories, order, orderType, state }) => {
        let filteredNotes = [];
        if (authors.length > 0 && categories.length > 0 && state) {
            filteredNotes = notesDefault.filter(note => {
                return findItem(authors, note.author) &&
                    findItem(categories, note.category) &&
                    findState(state, note.state);
            });
        } else if (authors.length > 0 && categories.length > 0) {
            filteredNotes = notesDefault.filter(note => {
                return findItem(authors, note.author) &&
                    findItem(categories, note.category);
            });
        } else if (authors.length > 0 && state) {
            filteredNotes = notesDefault.filter(note => {
                return findItem(authors, note.author) &&
                    findState(state, note.state);
            });
        } else if (categories.length > 0 && state) {
            filteredNotes = notesDefault.filter(note => {
                return findItem(categories, note.category) &&
                    findState(state, note.state);
            });
        } else if (authors.length > 0) {
            filteredNotes = notesDefault.filter(note => findItem(authors, note.author));
        } else if (categories.length > 0) {
            filteredNotes = notesDefault.filter(note => findItem(categories, note.category));
        } else if (state) {
            filteredNotes = notesDefault.filter(note => findState(state, note.state));
        } else {
            filteredNotes = notesDefault;
        }

        setNotes(orderBy[order.toLowerCase()](filteredNotes, orderType.toLowerCase()));
    }

    useEffect(() => {
        if (firstRender.current) {
            setNotes(orderBy['alphabetically'](notesDefault, 'descending'));
            firstRender.current = false;
        }
    });

    return (
        <div id="homepage" ref={firstRender}>
            <Navbar onSearch={handleSearchNotes} />
            <Toolbar onOrder={handleOrderByNotes} onFilter={handleFilter} />
            <NotesList notesDefault={notesDefault} notes={notes} />
        </div>
    );
}