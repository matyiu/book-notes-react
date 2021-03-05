import React, { useState } from 'react';
import { Col, Container, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectNoteById } from '../../redux/notesSlice';
import { TinyMceWrapper } from '../TinyMCE';

export const SingleNote = () => {
    const { bookId } = useParams();

    const note = useSelector(state => selectNoteById(state, bookId));

    // Form state
    const [ name, setName ] = useState(note.name);
    const [ author, setAuthor ] = useState(note.author);
    const [ category, setCategory ] = useState(note.category);
    const [ state, setState ] = useState(note.state);

    // Form handle state change
    const handleNameChange = e => setName(e.target.value);
    const handleAuthorChange = e => setAuthor(e.target.value);
    const handleCategoryChange = e => setCategory(e.target.value);
    const handleStateChange = e => setState(e.target.value);

    return (
        <div className="singleNote">
            <Container>
                <Link to="/"><i className="fas fa-arrow-left"></i>Back</Link>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="addNoteFormName">
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control type="text" onChange={handleNameChange} value={name}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col className="d-flex flex-wrap">
                            <Form.Group controlId="addNoteFormAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control as="select" onChange={handleAuthorChange} value={author}>
                                    <option></option>
                                    <option>David Goggins</option>
                                    <option>Cal Newport</option>
                                    <option>Grant Cardone</option>
                                    <option>JK Rowling</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="addNoteFormCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" onChange={handleCategoryChange} value={category}>
                                    <option></option>
                                    <option>Productivity</option>
                                    <option>Autobiography</option>
                                    <option>Personal development</option>
                                    <option>Fantasy</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="addNoteFormState">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" onChange={handleStateChange} value={state}>
                                    <option></option>
                                    <option>Read</option>
                                    <option>Reading</option>
                                    <option>To Read</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <TinyMceWrapper value={note.notes} />
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        </div>
    );
}