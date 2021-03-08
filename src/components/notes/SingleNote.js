import React, { useState } from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { noteUpdated, selectNoteById } from '../../redux/notesSlice';
import { authorAdded, categoryAdded, selectAllAuthors, selectAllCategories } from '../../redux/tagsSlice';
import { Select } from '../inputs/Select';
import { TinyMceWrapper } from '../TinyMCE';

export const SingleNote = () => {
    const { bookId } = useParams();

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
    }

    // Redux handlers
    const createAuthorTag = (content) => dispatch(authorAdded(content));
    const createCategoryTag = (content) => dispatch(categoryAdded(content));

    return (
        <div className="singleNote">
            <Container>
                <Link to="/" className="back"><i className="fas fa-arrow-left"></i>Back</Link>
                <Form>
                    <Form.Row className="singleNote-header">
                        <Col className="d-flex justify-content-between">
                            <Form.Control 
                                className="singleNote-name" 
                                type="text" 
                                onChange={handleNameChange} 
                                value={name}
                            ></Form.Control>
                            <Button variant="link" className="note-action"><i className="fas fa-trash"></i></Button>
                        </Col>
                    </Form.Row>
                    <Form.Row className="singleNote-options">
                        <Col className="d-flex flex-wrap">
                            <Form.Group controlId="addNoteFormAuthor">
                                <Form.Label>Author</Form.Label>
                                <Select 
                                    onChange={handleAuthorChange} 
                                    value={author} 
                                    options={authors} 
                                    read={false}
                                    createHandler={createAuthorTag}
                                />
                            </Form.Group>
                            <Form.Group controlId="addNoteFormCategory">
                                <Form.Label>Category</Form.Label>
                                <Select 
                                    onChange={handleCategoryChange} 
                                    value={category} 
                                    options={categories} 
                                    read={false}
                                    createHandler={createCategoryTag}
                                />
                            </Form.Group>
                            <Form.Group className="singleNote-state" controlId="addNoteFormState">
                                <Form.Label>State</Form.Label>
                                <Select onChange={handleStateChange} value={state} options={[
                                    {content: 'Read'},
                                    {content: 'Reading'},
                                    {content: 'To Read'},
                                ]} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <TinyMceWrapper value={notes} onEditorChange={handleNotesChange} />
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        </div>
    );
}