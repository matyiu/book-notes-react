import React, { useState } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { noteAdded } from '../../redux/notesSlice';

export const AddNoteForm = (props) => {
    const [ show, setShow ] = useState(true);
    const { callbackClose } = props;

    const dispatch = useDispatch();

    // Form state
    const [ name, setName ] = useState('');
    const [ author, setAuthor ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ state, setState ] = useState('');

    // Form handle state change
    const handleNameChange = e => setName(e.target.value);
    const handleAuthorChange = e => setAuthor(e.target.value);
    const handleCategoryChange = e => setCategory(e.target.value);
    const handleStateChange = e => setState(e.target.value);

    // Create note handle
    const canSave = name.trim() && author && category && state;

    const handleCreateNote = () => {
        if (canSave) {
            dispatch(noteAdded(
                name,
                author,
                category,
                state
            ));

            setShow(false);
        }
    };

    // Close handle
    const handleClose = () => setShow(false);

    return (
        <div className="addNoteForm">
            <Modal 
                size="lg" 
                show={show} 
                onHide={handleClose} 
                onExited={callbackClose}
                dialogClassName="bg-light"
                className="addNoteForm"
            >
                <Modal.Header>
                    <Modal.Title>Add a new book notes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="addNoteFormName">
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control type="text" onChange={handleNameChange}></Form.Control>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group controlId="addNoteFormAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control as="select" onChange={handleAuthorChange}>
                                    <option></option>
                                    <option>David Goggins</option>
                                    <option>Cal Newport</option>
                                    <option>Grant Cardone</option>
                                    <option>JK Rowling</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="addNoteFormCategory">
                                <Form.Label>Author</Form.Label>
                                <Form.Control as="select" onChange={handleCategoryChange}>
                                    <option></option>
                                    <option>Productivity</option>
                                    <option>Autobiography</option>
                                    <option>Personal development</option>
                                    <option>Fantasy</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="addNoteFormState">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select" onChange={handleStateChange}>
                                <option></option>
                                <option>Read</option>
                                <option>Reading</option>
                                <option>To Read</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-start">
                    <Button variant="primary" onClick={handleCreateNote}>
                        Create Note
                    </Button>
                    <Button variant="outline-primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};