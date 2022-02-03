import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  noteUpdated,
  selectNoteById,
  noteDeleted,
} from "../../redux/notesSlice";
import {
  authorAdded,
  categoryAdded,
  selectAllAuthors,
  selectAllCategories,
} from "../../redux/tagsSlice";
import { TagSelect } from "../elements/TagSelect";
import { TinyMceWrapper } from "../TinyMCE";
import styled from "styled-components";
import { darkTheme } from "../../variables/colors";
import { fonts } from "../../variables/fonts";
import { NoteListItemMetadata, NoteListItemRow } from "./NoteListItem";
import { Col, Row } from "../grid/grid";
import Trash from "../icons/Trash";

const SingleNoteContainer = styled.div`
  padding: 25px;
  margin: 0 -15px;
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

const SingleNoteRow = styled(Row)`
  margin: 0 -25px;

  ${Col} {
    padding: 0 25px;
    width: auto;
  }

  ${Col}.book-cover {
    flex: 1.57;
  }

  ${Col}.content {
    flex: 7.72;
  }

  ${Col}.actions {
    flex: 0.71;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
`;

export const SingleNote = () => {
  // React Router Dom
  const { noteId } = useParams();
  const history = useHistory();

  // Redux
  const dispatch = useDispatch();

  // Redux selectors
  const note = useSelector((state) => selectNoteById(state, parseInt(noteId)));
  const authors = useSelector(selectAllAuthors);
  const categories = useSelector(selectAllCategories);

  console.log(note);
  // Form state
  const [name, setName] = useState(note.title);
  const [author, setAuthor] = useState(
    note.authors && note.authors.length > 0 ? note.authors : null
  );
  const [category, setCategory] = useState(note.category);
  const [state, setState] = useState(note.state);
  const [notes, setNotes] = useState(note.note);

  // Form handle state change
  const handleNameChange = (e) => {
    setName(e.target.value);
    dispatch(
      noteUpdated({
        id: noteId,
        changes: { name: e.target.value },
      })
    );
  };
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
    dispatch(
      noteUpdated({
        id: noteId,
        changes: { author: e.target.value },
      })
    );
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    dispatch(
      noteUpdated({
        id: noteId,
        changes: { category: e.target.value },
      })
    );
  };
  const handleStateChange = (e) => {
    setState(e.target.value);
    dispatch(
      noteUpdated({
        id: noteId,
        changes: { state: e.target.value },
      })
    );
  };
  const handleNotesChange = (content) => {
    setNotes(content);
    dispatch(
      noteUpdated({
        id: noteId,
        changes: { notes: content },
      })
    );
  };
  const handleRemoveClick = () => {
    dispatch(noteDeleted(noteId));
    history.push("/");
  };

  // Redux handlers
  const createAuthorTag = (content) => dispatch(authorAdded(content));
  const createCategoryTag = (content) => dispatch(categoryAdded(content));

  return (
    <SingleNoteContainer>
      <SingleNoteRow>
        <Col className="content">
          <Form>
            <div className="singleNote-header">
              <Form.Control
                className="singleNote-name"
                type="text"
                onChange={handleNameChange}
                value={name}
              ></Form.Control>
            </div>
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
                  value={[category]}
                  options={categories}
                  // createHandler={createCategoryTag}
                />
              </NoteListItemRow>
              <NoteListItemRow>
                <TagSelect
                  onChange={handleStateChange}
                  value={state}
                  options={[
                    { content: "Read" },
                    { content: "Reading" },
                    { content: "To Read" },
                  ]}
                />
              </NoteListItemRow>
            </SingleNoteMetadata>
            <div>
              <TinyMceWrapper
                value={notes}
                onEditorChange={handleNotesChange}
              />
            </div>
          </Form>
        </Col>
        <Col className="actions">
          <Button
            variant="link"
            className="note-action"
            onClick={handleRemoveClick}
          >
            <Trash width="20" height="20" color={darkTheme.status.abandoned} />
          </Button>
        </Col>
      </SingleNoteRow>
    </SingleNoteContainer>
  );
};
