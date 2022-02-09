import React, { useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectAllAuthors, selectAllCategories } from '../../redux/tagsSlice'
import { ButtonDialog } from './ButtonDialog'
import { MultiSelect } from './MultiSelect'
import { Select } from './Select'

export const FilterNotes = (props) => {
    const { onOrder, onFilter } = props

    // Redux Selectors
    const authors = useSelector(selectAllAuthors)
    const categories = useSelector(selectAllCategories)

    // State
    const [orderBy, setOrderBy] = useState('Alphabetically')
    const [orderType, setOrderType] = useState('Descending')
    const [selectedAuthors, setSelectedAuthors] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedState, setSelectedState] = useState(String.fromCharCode(160))

    // Helpers
    const removeNonBreakingSpace = (str) =>
        str.replace(String.fromCharCode(160), '')

    // Event Handlers
    const handleOrderByChange = (e) => {
        setOrderBy(e.target.value)
        onOrder(e.target.value, orderType)
    }
    const handleOrderTypeChange = (e) => {
        setOrderType(e.target.value)
        onOrder(orderBy, e.target.value)
    }

    const handleAuthorsChange = (e) => {
        const authors = [...selectedAuthors, e.target.value]
        setSelectedAuthors(authors)
        onFilter({
            authors: authors,
            categories: selectedCategories,
            order: orderBy,
            orderType: orderType,
            state: removeNonBreakingSpace(selectedState),
        })
    }
    const handleAuthorsRemove = (e, value) => {
        e.preventDefault()
        e.stopPropagation()
        const authors = selectedAuthors.filter((author) => author !== value)
        setSelectedAuthors(authors)
        onFilter({
            authors: authors,
            categories: selectedCategories,
            order: orderBy,
            orderType: orderType,
            state: removeNonBreakingSpace(selectedState),
        })
    }

    const handleCategoriesChange = (e) => {
        const categories = [...selectedCategories, e.target.value]
        setSelectedCategories(categories)
        onFilter({
            authors: selectedAuthors,
            categories: categories,
            order: orderBy,
            orderType: orderType,
            state: removeNonBreakingSpace(selectedState),
        })
    }
    const handleCategoriesRemove = (e, value) => {
        e.preventDefault()
        e.stopPropagation()
        const categories = selectedCategories.filter(
            (author) => author !== value
        )
        setSelectedCategories(categories)
        onFilter({
            authors: selectedAuthors,
            categories: categories,
            order: orderBy,
            orderType: orderType,
            state: removeNonBreakingSpace(selectedState),
        })
    }

    const handleStateChange = (e) => {
        const state = e.target.value
        setSelectedState(state)
        onFilter({
            authors: selectedAuthors,
            categories: selectedCategories,
            order: orderBy,
            orderType: orderType,
            state: removeNonBreakingSpace(state),
        })
    }

    return (
        <ButtonDialog
            className="btn btn-outline-primary"
            btnText="Filter"
            containerClassName="filterNotes"
        >
            <Form>
                <Form.Row>
                    <Col xs="12">
                        <h3>Sort</h3>
                    </Col>
                    <Col className="d-flex flex-wrap justify-content-between">
                        <Select
                            onChange={handleOrderByChange}
                            options={[
                                {
                                    content: 'Created',
                                },
                                {
                                    content: 'Alphabetically',
                                },
                            ]}
                            value={orderBy}
                        />
                        <Select
                            onChange={handleOrderTypeChange}
                            options={[
                                {
                                    content: 'Ascending',
                                },
                                {
                                    content: 'Descending',
                                },
                            ]}
                            value={orderType}
                        />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs="12">
                        <h3>Filter</h3>
                    </Col>
                    <Col xs="12">
                        <Form.Group
                            controlId="filterAuthor"
                            className="filter-select"
                        >
                            <Form.Label>Author</Form.Label>
                            <MultiSelect
                                options={authors}
                                value={selectedAuthors}
                                onChange={handleAuthorsChange}
                                onRemoveTag={handleAuthorsRemove}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs="12">
                        <Form.Group
                            controlId="filterCategory"
                            className="filter-select"
                        >
                            <Form.Label>Category</Form.Label>
                            <MultiSelect
                                options={categories}
                                value={selectedCategories}
                                onChange={handleCategoriesChange}
                                onRemoveTag={handleCategoriesRemove}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs="12">
                        <Form.Group controlId="filterState">
                            <Form.Label>State</Form.Label>
                            <Select
                                options={[
                                    { content: String.fromCharCode('160') },
                                    { content: 'Read' },
                                    { content: 'Reading' },
                                    { content: 'To Read' },
                                ]}
                                value={selectedState}
                                onChange={handleStateChange}
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
            </Form>
        </ButtonDialog>
    )
}
