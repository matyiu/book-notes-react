import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { selectAllAuthors, selectAllCategories } from "../../redux/tagsSlice";
import { noteDeleted } from "../../redux/notesSlice";
import NoteListItem from "./NoteListItem";
import { Container, Row, Col } from "../grid/grid";

export const NotesList = (props) => {
  const { notes } = props;

  const dispatch = useDispatch();

  // Redux Selectors
  const authors = useSelector(selectAllAuthors);
  const categories = useSelector(selectAllCategories);

  const renderedNotes = notes.map((note) => {
    const author = authors.find((author) => author.value === note.author);
    const category = categories.find(
      (category) => category.value === note.category
    );

    const handleRemoveClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(noteDeleted(note.id));
    };

    return (
      <Col colNumber="6" key={note.id}>
        <NoteListItem note={note} onRemove={handleRemoveClick} />
      </Col>
    );
  });

  return (
    <div className="notesList">
      <Container>
        <Row>
          {renderedNotes.length > 0 ? (
            renderedNotes
          ) : (
            <Col colNumber="12">
              <Alert variant="info">No notes has been found</Alert>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};
