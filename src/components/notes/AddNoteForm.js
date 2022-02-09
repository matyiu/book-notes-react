import React, { useState } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectAllAuthors,
    selectAllCategories,
    authorAdded,
    categoryAdded,
} from '../../redux/tagsSlice'
import { SearchSelect } from '../inputs/SearchSelect'
import { Select } from '../inputs/Select'

export const AddNoteForm = (props) => {
    const [show, setShow] = useState(true)
    const { callbackClose } = props

    const dispatch = useDispatch()

    // Redux Selectors
    const authors = useSelector(selectAllAuthors)
    const categories = useSelector(selectAllCategories)

    // Form state
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [state, setState] = useState('')

    // Form handle state change
    const handleNameChange = (e) => setName(e.target.value)
    const handleAuthorChange = (e) => setAuthor(e.target.value)
    const handleCategoryChange = (e) => setCategory(e.target.value)
    const handleStateChange = (e) => setState(e.target.value)

    // Create note handle
    const canSave = name.trim() && author && category && state

    const handleCreateNote = () => {
        if (canSave) {
            //   dispatch(noteAdded(name, author, category, state));

            setShow(false)
        }
    }

    // Close handle
    const handleClose = () => setShow(false)

    // Redux handlers
    const createAuthorTag = (content) => dispatch(authorAdded(content))
    const createCategoryTag = (content) => dispatch(categoryAdded(content))

    return (
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
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="addNoteFormName">
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={handleNameChange}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col className="d-flex flex-wrap">
                            <Form.Group controlId="addNoteFormAuthor">
                                <Form.Label>Author</Form.Label>
                                <SearchSelect
                                    options={[{ content: '' }, ...authors]}
                                    onChange={handleAuthorChange}
                                    value={author}
                                    createHandler={createAuthorTag}
                                />
                            </Form.Group>
                            <Form.Group controlId="addNoteFormCategory">
                                <Form.Label>Category</Form.Label>
                                <SearchSelect
                                    options={[{ content: '' }, ...categories]}
                                    onChange={handleCategoryChange}
                                    value={category}
                                    createHandler={createCategoryTag}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="addNoteFormState">
                                <Form.Label>State</Form.Label>
                                <Select
                                    options={[
                                        { content: '' },
                                        { content: 'Read' },
                                        { content: 'Reading' },
                                        { content: 'To Read' },
                                    ]}
                                    value={state}
                                    onChange={handleStateChange}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
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
    )
}
