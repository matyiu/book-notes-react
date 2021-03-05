import React from 'react';
import { useSelector } from 'react-redux';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NotesList = () => {
    const notes = useSelector(status => status.notes);

    const renderedNotes = notes.map(
        note => (
            <Col xs="12" key={note.id}>
                <Link to={`/book/${note.id}`}>
                    <article className="note">
                        <h2>{note.name}</h2>
                        <div className="note-metadata">
                            <div className="tag">{note.state}</div>
                            <div className="tag">{note.category}</div>
                            <div className="tag">{note.author}</div>
                        </div>
                        <Button className="note-action" variant="link">
                            <i className="fas fa-trash"></i>
                        </Button>
                    </article>
                </Link>
            </Col>
        )
    );

    return (
        <div className="notesList">
            <Container>
                <Row>
                    {(renderedNotes.length > 0) ? 
                        renderedNotes : 
                        (
                            <Col xs="12">
                                <Alert variant="info">No notes has been found</Alert>
                            </Col>
                        )
                    }
                </Row>
            </Container>
        </div>
    );
};