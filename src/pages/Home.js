import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import fetchWrapper from '../app/fetchWrapper'
import { Col, Container, Row } from '../components/grid/grid'
import Main from '../components/includes/Main'
import { Navbar } from '../components/Navbar'
import { NotesList } from '../components/notes/NotesList'
import { Sidebar } from '../components/Sidebar'
import { Toolbar } from '../components/Toolbar'
import { setNotes as setNotesState } from '../redux/notesSlice'
import { setTags } from '../redux/tagsSlice'

export const Home = () => {
    // Redux Selectors
    const notesDefault = useSelector((status) => status.notes)
    const logged = useSelector((status) => status.auth.logged)
    const tags = useSelector((state) => state.tags)

    // React State
    const [notes, setNotes] = useState(notesDefault)
    const [currentFilter, setCurrentFilter] = useState({
        authors: [],
        categories: [],
        order: 'Alphabetically',
        orderType: 'Descending',
        state: '',
    })

    // Refs
    const firstRender = useRef(true)

    // React Dom
    const history = useHistory()
    logged || history.push('/login')

    // Helper functions
    const orderBy = {
        alphabetically: (unorderedArr, type) => {
            if (type === 'ascending') {
                return [...unorderedArr].sort((a, b) => {
                    const aName = a.name.toLowerCase()
                    const bName = b.name.toLowerCase()

                    if (aName[0] > bName[0]) {
                        return 1
                    } else if (aName[0] < bName[0]) {
                        return -1
                    }

                    return 0
                })
            } else if (type === 'descending') {
                return [...unorderedArr].sort((a, b) => {
                    const aName = a.name.toLowerCase()
                    const bName = b.name.toLowerCase()

                    if (aName[0] < bName[0]) {
                        return 1
                    } else if (aName[0] > bName[0]) {
                        return -1
                    }

                    return 0
                })
            }
        },
        created: (unorderedArr, type) => {
            if (type === 'ascending') {
                return [...unorderedArr].sort((a, b) => {
                    if (a.created > b.created) {
                        return 1
                    } else if (a.created < b.created) {
                        return -1
                    }

                    return 0
                })
            }
            if (type === 'descending') {
                return [...unorderedArr].sort((a, b) => {
                    if (a.created < b.created) {
                        return 1
                    } else if (a.created > b.created) {
                        return -1
                    }

                    return 0
                })
            }
        },
    }

    const findItem = (arr, value) =>
        arr.findIndex((item) => item === value) > -1

    const findState = (state, noteState) => state === noteState

    // Event Handlers
    const handleSearchNotes = (e) => {
        if (e.target.value.length === 0) {
            handleFilter(currentFilter)
            return
        }

        setNotes(
            notesDefault.filter((note) => note.name.startsWith(e.target.value))
        )
    }
    const handleOrderByNotes = (order, type) => {
        setNotes(orderBy[order.toLowerCase()](notes, type.toLowerCase()))
    }
    const handleFilter = (options) => {
        const { authors, categories, order, orderType, state } = options

        if (!Object.is(options, currentFilter)) {
            setCurrentFilter(options)
        }

        let filteredNotes = []
        if (authors.length > 0 && categories.length > 0 && state) {
            filteredNotes = notesDefault.filter((note) => {
                return (
                    findItem(authors, note.author) &&
                    findItem(categories, note.category) &&
                    findState(state, note.state)
                )
            })
        } else if (authors.length > 0 && categories.length > 0) {
            filteredNotes = notesDefault.filter((note) => {
                return (
                    findItem(authors, note.author) &&
                    findItem(categories, note.category)
                )
            })
        } else if (authors.length > 0 && state) {
            filteredNotes = notesDefault.filter((note) => {
                return (
                    findItem(authors, note.author) &&
                    findState(state, note.state)
                )
            })
        } else if (categories.length > 0 && state) {
            filteredNotes = notesDefault.filter((note) => {
                return (
                    findItem(categories, note.category) &&
                    findState(state, note.state)
                )
            })
        } else if (authors.length > 0) {
            filteredNotes = notesDefault.filter((note) =>
                findItem(authors, note.author)
            )
        } else if (categories.length > 0) {
            filteredNotes = notesDefault.filter((note) =>
                findItem(categories, note.category)
            )
        } else if (state) {
            filteredNotes = notesDefault.filter((note) =>
                findState(state, note.state)
            )
        } else {
            filteredNotes = notesDefault
        }
    }

    const dispatch = useDispatch()
    useEffect(async () => {
        if (notesDefault.data.length === 0) {
            const res = await fetchWrapper.get(
                'http://boonote.test:8000/api/notes'
            )
            if (res.status < 300 && res.status >= 200) {
                const json = await res.json()
                if (json.success) {
                    dispatch(setNotesState(json.data))
                }
            } else {
                sessionStorage.setItem('logged', 'false')
                history.push('/login')
            }
        }

        if (tags.author.length === 0 || tags.category.length === 0) {
            const rawAuthors = await fetchWrapper.get(
                'http://boonote.test:8000/api/user/authors'
            )
            const rawCategories = await fetchWrapper.get(
                'http://boonote.test:8000/api/user/categories'
            )
            const authorsRes = await rawAuthors.json()
            const categoriesRes = await rawCategories.json()

            if (authorsRes.success && categoriesRes.success) {
                dispatch(
                    setTags({
                        author: authorsRes.data,
                        category: categoriesRes.data,
                    })
                )
            }
        }
    }, [])

    return (
        <div id="homepage" ref={firstRender}>
            <Navbar />
            <Main>
                <Container>
                    <Row>
                        <Col colNumber={3}>
                            <Sidebar />
                        </Col>
                        <Col colNumber={9}>
                            <Toolbar
                                onOrder={handleOrderByNotes}
                                onFilter={handleFilter}
                            />
                            <NotesList
                                notesDefault={notesDefault}
                                notes={notesDefault}
                            />
                        </Col>
                    </Row>
                </Container>
            </Main>
        </div>
    )
}
