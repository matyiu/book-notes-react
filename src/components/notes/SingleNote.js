import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {
    noteUpdated,
    selectNoteById,
    noteDeleted,
    setNotes as setNotesRedux,
} from '../../redux/notesSlice'
import {
    authorAdded,
    categoryAdded,
    selectAllAuthors,
    selectAllCategories,
} from '../../redux/tagsSlice'
import { TagSelect } from '../elements/TagSelect'
import ContentEditable from '../inputs/ContentEditable'
import styled from 'styled-components'
import { darkTheme } from '../../variables/colors'
import { fonts } from '../../variables/fonts'
import { NoteListItemMetadata, NoteListItemRow } from './NoteListItem'
import { Col, Row } from '../grid/grid'
import Trash from '../icons/Trash'
import fetchWrapper from '../../app/fetchWrapper'
import useCreateOptions from '../../hooks/useCreateOptions'
import debounce from '../../app/debounce'
import { StatusMessage } from '../elements/Form'
import loadingMap from '../../app/loadingMap'
import { ButtonLink } from '../elements/Button'
import mapToArr from '../../app/mapToArr'
import stateMap from '../../app/stateMap'
import useNote from '../../hooks/useNote'

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
`

const SingleNoteMetadata = styled(NoteListItemMetadata)`
    margin-bottom: 33px;
`

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
`

const dispatchState = debounce(({ id, changes, dispatch }) => {
    dispatch(
        noteUpdated({
            id,
            changes,
        })
    )
}, 3000)

export const SingleNote = () => {
    // React Router Dom
    const { noteId } = useParams()
    const history = useHistory()

    // Redux
    const dispatch = useDispatch()

    // Redux selectors
    const note = useSelector((state) => selectNoteById(state, parseInt(noteId)))
    const authors = useSelector((state) => selectAllAuthors(state))
    const categories = useSelector((state) => selectAllCategories(state))
    const status = useSelector((state) => state.notes.status)

    // Form state
    const defaultNoteState = note && {
        title: note.title,
        author: note.authors,
        note: note.note,
        state: note.state,
        category: note.category,
    }
    const [noteState, setNoteState] = useNote(defaultNoteState)
    const [authorOptions, setAuthorOptions] = useCreateOptions(
        authors,
        'author'
    )
    const [categoryOptions, setCategoryOptions] = useCreateOptions(
        categories,
        'category'
    )

    // Form handle state change
    const handleNameChange = (e) => {
        const changes = { ...noteState, title: e.target.value }
        setNoteState(changes)
        dispatchState({
            id: Number(noteId),
            changes: changes,
            dispatch,
        })
    }
    const handleAuthorChange = (e) => {
        const changes = { ...noteState, author: e.target.value }
        setNoteState(changes)
        dispatchState({
            id: Number(noteId),
            changes: changes,
            dispatch,
        })
    }
    const handleCategoryChange = (e) => {
        const changes = { ...noteState, category: e.target.value }
        setNoteState(changes)
        dispatchState({
            id: Number(noteId),
            changes: changes,
            dispatch,
        })
    }
    const handleStateChange = (e) => {
        const changes = { ...noteState, state: e.target.value.id }
        setNoteState(changes)
        dispatchState({
            id: Number(noteId),
            changes: changes,
            dispatch,
        })
    }
    const handleNotesChange = (e) => {
        const changes = { ...noteState, note: e.target.innerHTML }
        setNoteState(changes)

        dispatchState({
            id: Number(noteId),
            changes: changes,
            dispatch,
        })
    }
    const handleRemoveClick = () => {
        dispatch(noteDeleted(Number(noteId)))
        history.push('/')
    }

    // Redux handlers
    const createAuthorTag = (content) => {
        const newAuthor = { ...content, id: Math.round(Math.random() * 10000) } // Placeholder id to mock back end interaction

        dispatch(authorAdded(newAuthor))
    }
    const createCategoryTag = (content) => {
        dispatch(
            categoryAdded({ ...content, id: Math.round(Math.random() * 10000) })
        )
    }

    const handleChangeInputAuthor = (e) => {
        const value = e.target.innerHTML
        const createOption = { id: null, name: value }

        setAuthorOptions(createOption)
    }

    const handleChangeInputCategory = (e) => {
        const value = e.target.innerHTML
        const createOption = { id: null, name: value }

        setCategoryOptions(createOption)
    }

    const retrySave = () => {
        dispatchState({
            id: Number(noteId),
            changes: noteState,
            dispatch,
        })
    }

    return (
        <SingleNoteContainer>
            {status !== loadingMap.get(0) && (
                <SingleNoteRow>
                    <Col>
                        {status === loadingMap.get(1) && (
                            <StatusMessage>Saving note</StatusMessage>
                        )}
                        {status === loadingMap.get(2) && (
                            <StatusMessage type="success">
                                Note saved successfully
                            </StatusMessage>
                        )}
                        {status === loadingMap.get(3) && (
                            <StatusMessage type="error">
                                Note couldn't be saved
                                <ButtonLink onClick={retrySave}>
                                    Try again
                                </ButtonLink>
                            </StatusMessage>
                        )}
                    </Col>
                </SingleNoteRow>
            )}
            <SingleNoteRow>
                <Col className="content">
                    <Form>
                        <div className="singleNote-header">
                            <Form.Control
                                className="singleNote-name"
                                type="text"
                                onChange={handleNameChange}
                                value={noteState.title}
                            ></Form.Control>
                        </div>
                        <SingleNoteMetadata>
                            <NoteListItemRow>
                                <TagSelect
                                    onChange={handleAuthorChange}
                                    value={noteState.author}
                                    options={authorOptions}
                                    onCreate={createAuthorTag}
                                    onChangeInput={handleChangeInputAuthor}
                                />
                                <TagSelect
                                    onChange={handleCategoryChange}
                                    value={
                                        noteState.category && [
                                            noteState.category,
                                        ]
                                    }
                                    options={categoryOptions}
                                    onCreate={createCategoryTag}
                                    onChangeInput={handleChangeInputCategory}
                                />
                            </NoteListItemRow>
                            <NoteListItemRow>
                                <TagSelect
                                    onChange={handleStateChange}
                                    value={{
                                        id: noteState.state,
                                        name: stateMap.get(noteState.state),
                                    }}
                                    options={mapToArr(stateMap)}
                                    read={true}
                                />
                            </NoteListItemRow>
                        </SingleNoteMetadata>
                        <div>
                            <ContentEditable
                                value={noteState.note}
                                onChange={handleNotesChange}
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
                        <Trash
                            width="20"
                            height="20"
                            color={darkTheme.status.abandoned}
                        />
                    </Button>
                </Col>
            </SingleNoteRow>
        </SingleNoteContainer>
    )
}
