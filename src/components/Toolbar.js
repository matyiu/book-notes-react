import React, { useState } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { FilterNotes } from './inputs/FilterNotes';
import { AddNoteForm } from './notes/AddNoteForm';

export const Toolbar = (props) => {
    const { onOrder, onFilter } = props;

    const [ openForm, setOpenForm ] = useState(false);

    const handleClosedCreateForm = () => setOpenForm(false);
    const handleCreateForm = () => setOpenForm(true);

    return (
        <div className="toolbar">
            <Container>
                <Row>
                    <Col className="d-flex">
                        <Button className="mr-auto" onClick={handleCreateForm}>Create Note</Button>
                        <FilterNotes onOrder={onOrder} onFilter={onFilter} />
                    </Col>
                </Row>
            </Container>
            {openForm && <AddNoteForm callbackClose={handleClosedCreateForm} />}
        </div>
    );
};