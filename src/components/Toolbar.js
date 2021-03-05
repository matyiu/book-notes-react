import React, { useState } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { AddNoteForm } from './notes/AddNoteForm';

export const Toolbar = () => {
    const [ openForm, setOpenForm ] = useState(false);

    const handleClosedCreateForm = () => setOpenForm(false);
    const handleCreateForm = () => setOpenForm(true);

    return (
        <div className="toolbar">
            <Container>
                <Row>
                    <Col className="d-flex">
                        <Button className="mr-auto" onClick={handleCreateForm}>Create Note</Button>
                        <Button variant="outline-primary">Filter</Button> {/* TODO: Filter component */}
                    </Col>
                </Row>
            </Container>
            {openForm && <AddNoteForm callbackClose={handleClosedCreateForm} />}
        </div>
    );
};