import React from 'react';
import { useSelector } from 'react-redux';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { selectAllAuthors, selectAllCategories } from '../../redux/tagsSlice';

export const NotesList = () => {
    const notes = useSelector(status => status.notes);
    const authors = useSelector(selectAllAuthors);
    const categories = useSelector(selectAllCategories);

    const renderedNotes = notes.map(
        note => {
            const author = authors.find(author => author.value === note.author);
            const category = categories.find(category => category.value === note.category);

            return (
                <Col xs="12" key={note.id}>
                    <Link to={`/book/${note.id}`}>
                        <article className="note">
                            <h2>{note.name}</h2>
                            <div className="note-metadata">
                                <div className="tag">{note.state}</div>
                                <div className="tag">{category.content}</div>
                                <div className="tag">{author.content}</div>
                            </div>
                            <Button className="note-action" variant="link">
                                <i className="fas fa-trash"></i>
                            </Button>
                        </article>
                    </Link>
                </Col>
            );
        }
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