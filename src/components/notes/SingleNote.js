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
    setTags,
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
    const [statusMessage, setStatusMessage] = useState(null)
    const [name, setName] = useState(note && note.title)
    const [author, setAuthor] = useState(
        note && note.authors && note.authors.length > 0 ? note.authors : null
    )
    const [category, setCategory] = useState(note && note.category)
    const [state, setState] = useState(note && note.state)
    const [notes, setNotes] = useState(note && note.note)
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
        setName(e.target.value)
        dispatchState({
            id: Number(noteId),
            changes: {
                title: e.target.value,
                author,
                notes,
                state,
                category,
            },
            dispatch,
        })
    }
    const handleAuthorChange = (e) => {
        setAuthor(e.target.value)
        dispatchState({
            id: Number(noteId),
            changes: {
                title: name,
                author: e.target.value,
                notes,
                state,
                category,
            },
            dispatch,
        })
    }
    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
        dispatchState({
            id: Number(noteId),
            changes: {
                title: name,
                author,
                notes,
                state,
                category: e.target.value,
            },
            dispatch,
        })
    }
    const handleStateChange = (e) => {
        setState(e.target.value)
        dispatchState({
            id: Number(noteId),
            changes: {
                title: name,
                author,
                notes,
                state: e.target.value,
                category,
            },
            dispatch,
        })
    }
    const handleNotesChange = (e) => {
        const content = e.target.innerHTML
        setNotes(content)

        dispatchState({
            id: Number(noteId),
            changes: {
                title: name,
                author,
                note: content,
                state,
                category,
            },
            dispatch,
        })
    }
    const handleRemoveClick = () => {
        dispatch(noteDeleted(Number(noteId)))
        history.push('/')
    }

    useEffect(async () => {
        if (!note) {
            const raw = await fetchWrapper.get(
                'http://boonote.test:8000/api/notes/' + noteId
            )
            const res = await raw.json()

            if (res.success) {
                dispatch(setNotesRedux(res.data))
            }
        }
    }, [])

    useEffect(async () => {
        if (categories.length === 0) {
            const raw = await fetchWrapper.get(
                'http://boonote.test:8000/api/user/categories'
            )
            const res = await raw.json()

            if (res.success) {
                dispatch(setTags({ category: res.data }))
            }
        }

        if (authors.length === 0) {
            const raw = await fetchWrapper.get(
                'http://boonote.test:8000/api/user/authors'
            )
            const res = await raw.json()

            if (res.success) {
                dispatch(setTags({ author: res.data }))
            }
        }
    }, [])

    useEffect(() => {
        if (status === loadingMap.get(2) && statusMessage) {
            setStatusMessage('Note saved successfully.')
            setTimeout(() => {
                setStatusMessage(null)
            }, 5000)
        } else if (status === loadingMap.get(1)) {
            setStatusMessage('Saving note...')
        } else if (status === loadingMap.get(3)) {
            setStatusMessage("The note couldn't be saved.")
        }
    }, [status])

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

    return (
        <SingleNoteContainer>
            {statusMessage && (
                <SingleNoteRow>
                    <Col>
                        <StatusMessage>{statusMessage}</StatusMessage>
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
                                value={name}
                            ></Form.Control>
                        </div>
                        <SingleNoteMetadata>
                            <NoteListItemRow>
                                <TagSelect
                                    onChange={handleAuthorChange}
                                    value={author}
                                    options={authorOptions}
                                    onCreate={createAuthorTag}
                                    onChangeInput={handleChangeInputAuthor}
                                />
                                <TagSelect
                                    onChange={handleCategoryChange}
                                    value={category && [category]}
                                    options={categoryOptions}
                                    onCreate={createCategoryTag}
                                    onChangeInput={handleChangeInputCategory}
                                />
                            </NoteListItemRow>
                            <NoteListItemRow>
                                <TagSelect
                                    onChange={handleStateChange}
                                    value={state}
                                    options={[
                                        { content: 'Read' },
                                        { content: 'Reading' },
                                        { content: 'To Read' },
                                    ]}
                                />
                            </NoteListItemRow>
                        </SingleNoteMetadata>
                        <div>
                            <ContentEditable
                                value={notes}
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
