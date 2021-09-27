import React, { useState } from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { noteUpdated, selectNoteById, noteDeleted } from '../../redux/notesSlice';
import { authorAdded, categoryAdded, selectAllAuthors, selectAllCategories } from '../../redux/tagsSlice';
import { TagSelect } from '../elements/TagSelect';
import { TinyMceWrapper } from '../TinyMCE';
import styled from 'styled-components';
import { darkTheme } from '../../variables/colors';
import { fonts } from '../../variables/fonts';
import { NoteListItemMetadata, NoteListItemRow } from './NoteListItem';

const SingleNoteContainer = styled.div`
    padding: 25px;
    background: ${darkTheme.primary.input};
    color: ${darkTheme.white.text};

    .singleNote-header {
        margin-bottom: 13px;

        .singleNote-name {
            border: none;
            padding: 0;
            height: auto;
            color: ${darkTheme.white.accent};
            font-size: ${fonts.h2.size}px;
            line-height: ${fonts.h2.lineHeight}px;
        }
    }

    .singleNote-options {
        margin: 0 -15px;
        margin-bottom: 60px;

        .form-group {
            margin: 0 15px;
            min-width: 237px;
        }

        .singleNote-state {
            margin-left: auto;
        }
    }
`;

const SingleNoteMetadata = styled(NoteListItemMetadata)`
    margin-bottom: 33px;
`;

export const SingleNote = () => {
    // React Router Dom
    const { bookId } = useParams();
    const history = useHistory();

    // Redux
    const dispatch = useDispatch();

    // Redux selectors
    const note = useSelector(state => selectNoteById(state, bookId));
    const authors = useSelector(selectAllAuthors);
    const categories = useSelector(selectAllCategories);

    // Form state
    const [ name, setName ] = useState(note.name);
    const [ author, setAuthor ] = useState(note.author);
    const [ category, setCategory ] = useState(note.category);
    const [ state, setState ] = useState(note.state);
    const [ notes, setNotes ] = useState(note.notes);

    // Form handle state change
    const handleNameChange = e => {
        setName(e.target.value);
        dispatch(noteUpdated({
            id: bookId,
            changes: {name: e.target.value}
        }));
    };
    const handleAuthorChange = e => {
        setAuthor(e.target.value)
        dispatch(noteUpdated({
            id: bookId,
            changes: {author: e.target.value}
        }));
    };
    const handleCategoryChange = e => {
        setCategory(e.target.value);
        dispatch(noteUpdated({
            id: bookId,
            changes: {category: e.target.value}
        }));
    };
    const handleStateChange = e => {
        setState(e.target.value);
        dispatch(noteUpdated({
            id: bookId,
            changes: {state: e.target.value}
        }));
    };
    const handleNotesChange = content => {
        setNotes(content);
        dispatch(noteUpdated({
            id: bookId,
            changes: {notes: content}
        }));
    };
    const handleRemoveClick = () => {
        dispatch(noteDeleted(bookId));
        history.push('/');
    };

    // Redux handlers
    const createAuthorTag = (content) => dispatch(authorAdded(content));
    const createCategoryTag = (content) => dispatch(categoryAdded(content));

    return (
        <SingleNoteContainer>
                <Form>
                    <Form.Row className="singleNote-header">
                        <Col className="d-flex justify-content-between">
                            <Form.Control 
                                className="singleNote-name" 
                                type="text" 
                                onChange={handleNameChange} 
                                value={name}
                            ></Form.Control>
                            {/* <Button 
                                variant="link" 
                                className="note-action"
                                onClick={handleRemoveClick}
                            >
                                <i className="fas fa-trash"></i>
                            </Button> */}
                        </Col>
                    </Form.Row>
                    <SingleNoteMetadata>
                        <NoteListItemRow>
                            <TagSelect 
                                onChange={handleAuthorChange}
                                value={author}
                                options={authors}
                                // createHandler={createAuthorTag}
                            />
                            <TagSelect 
                                onChange={handleCategoryChange}
                                value={category}
                                options={categories}
                                // createHandler={createCategoryTag}
                            />
                        </NoteListItemRow>
                        <NoteListItemRow>
                            <TagSelect onChange={handleStateChange} value={state} options={[
                                {content: 'Read'},
                                {content: 'Reading'},
                                {content: 'To Read'},
                            ]} />
                        </NoteListItemRow>
                    </SingleNoteMetadata>
                    <Form.Row>
                        <Col>
                            <TinyMceWrapper value={notes} onEditorChange={handleNotesChange} />
                        </Col>
                    </Form.Row>
                </Form>
        </SingleNoteContainer>
    );
}