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

    // Event Handlers
    const handleSearchNotes = (e) => {
        setNotes(notesDefault.filter(
            note => note.name.startsWith(e.target.value)));
    }
    const handleOrderByNotes = (order, type) => {
        setNotes(orderBy[order.toLowerCase()](notes, type.toLowerCase()));
    }
    const handleFilter = ({ authors, categories, order, orderType }) => {
        let filteredNotes = [];
        if (authors.length > 0 && categories > 0) {
            filteredNotes = notesDefault.filter(note => {
                return authors.findIndex(author => author === note.author) > -1 &&
                categories.findIndex(category => category === note.category) > -1;
            });
        } else if (authors.length > 0) {
            filteredNotes = notesDefault.filter(note => 
                authors.findIndex(author => author === note.author) > -1);
        } else if (categories.length > 0) {
            filteredNotes = notesDefault.filter(note =>
                categories.findIndex(category => category === note.category) > -1);
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