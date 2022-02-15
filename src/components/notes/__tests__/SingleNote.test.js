import React from 'react'
import {
    mockNoteSlice,
    mockTagSlice,
    render,
    screen,
} from '../../../test-utils'
import { createMemoryHistory } from 'history'
import { configureStore } from '@reduxjs/toolkit'
import { SingleNote } from '../SingleNote'
import notesSlice from '../../../redux/notesSlice'
import authSlice from '../../../redux/authSlice'
import { Route } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import stateMap from '../../../app/stateMap'

jest.mock('../../../app/debounce.js', () => jest.fn((fn) => fn))

const renderSingleNote = () => {
    const history = createMemoryHistory()
    history.push('/notes/1')

    return render(
        <Route path="/notes/:noteId">
            <SingleNote />
        </Route>,
        {
            store: configureStore({
                reducer: { notes: notesSlice, tags: authSlice },
                preloadedState: {
                    notes: mockNoteSlice,
                    tags: mockTagSlice,
                },
            }),
            history,
        }
    )
}

describe('Save State', () => {
    const successRes = JSON.stringify({
        success: true,
        message: '',
        data: {
            id: 1,
            title: 'Title 1 - Changed',
            note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis quia quam sint magni ipsum officia voluptates incidunt commodi repudiandae voluptatum iusto ipsam magnam modi placeat eligendi laudantium nobis, veniam dolorum.',
            category: 1,
            authors: [1, 2],
        },
    })

    it('Displays success state', async () => {
        renderSingleNote()
        fetch.mockResponse(successRes)

        const titleInput = screen.getByDisplayValue('Title 1')
        userEvent.type(titleInput, ' - Changed')
        expect(await screen.findByText(/note saved/i)).toBeTruthy()
    })

    it('Displays loading state', async () => {
        renderSingleNote()
        fetch.mockResponse(successRes)

        const titleInput = screen.getByDisplayValue('Title 1')
        userEvent.type(titleInput, ' - Changed')
        expect(await screen.findByText(/saving note/i)).toBeTruthy()
    })

    it('Displays error state on http error status code', async () => {
        renderSingleNote()
        fetch.mockResponse(successRes, {
            status: 500,
        })

        const titleInput = screen.getByDisplayValue('Title 1')
        userEvent.type(titleInput, ' - Changed')
        expect(await screen.findByText(/note couldn't be saved/i)).toBeTruthy()
        expect(
            await screen.findByRole('button', { name: 'Try again' })
        ).toBeTruthy()
    })

    it('Displays error state on client error', async () => {
        renderSingleNote()
        fetch.mockReject(new TypeError('Failed to fetch'))

        const titleInput = screen.getByDisplayValue('Title 1')
        userEvent.type(titleInput, ' - Changed')
        expect(await screen.findByText(/note couldn't be saved/i)).toBeTruthy()
        expect(
            await screen.findByRole('button', { name: 'Try again' })
        ).toBeTruthy()
    })
})

describe('Change Handler', () => {
    beforeEach(() => {
        renderSingleNote()
    })

    it('Changes title', async () => {
        const noteData = mockNoteSlice.data[0]
        const title = screen.getByDisplayValue(noteData.title)
        userEvent.type(title, ' Changed')
        expect(await screen.findByDisplayValue(/changed/i)).toBeTruthy()
    })

    it('Changes author', async () => {
        const author = screen.getByText('Author 1')
        userEvent.click(author)
        const option = await screen.findByText('Author 2')
        userEvent.click(option)
        expect(await screen.findByText('Author 2')).toBeTruthy()
    })

    it('Changes category', async () => {
        const category = screen.getByText('Category 1')
        userEvent.click(category)
        const option = await screen.findByText('Category 2')
        userEvent.click(option)
        expect(await screen.findByText('Category 2')).toBeTruthy()
    })

    it('Changes state', async () => {
        const state = screen.getByText(stateMap.get(1))
        userEvent.click(state)
        const option = await screen.findByText(stateMap.get(2))
        userEvent.click(option)
        expect(await screen.findByText(stateMap.get(2))).toBeTruthy()
    })

    it('Changes note content', async () => {
        const noteData = mockNoteSlice.data[0]
        const content = screen.getByText(noteData.note)
        userEvent.type(content, ' Content Changes')
        expect(await screen.findByText(/content changes/i)).toBeTruthy()
    })
})
