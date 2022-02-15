import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

const customRender = (ui, options = {}) => {
    const { store, history = createMemoryHistory(), ...renderOptions } = options

    const Wrapper = ({ children }) => {
        return (
            <Provider store={store}>
                <Router history={history}>{children}</Router>
            </Provider>
        )
    }

    return render(ui, { wrapper: Wrapper, ...renderOptions })
}

const changeFieldValue = (field, value) => {
    fireEvent.change(field, {
        target: {
            value,
        },
    })
}

export * from '@testing-library/react'
export { customRender as render, changeFieldValue }

export const mockNoteSlice = {
    status: 'idle',
    message: null,
    data: [
        {
            id: 1,
            title: 'Title 1',
            note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis quia quam sint magni ipsum officia voluptates incidunt commodi repudiandae voluptatum iusto ipsam magnam modi placeat eligendi laudantium nobis, veniam dolorum.',
            category: {
                id: 1,
                name: 'Category 1',
            },
            authors: [
                {
                    id: 1,
                    name: 'Author 1',
                },
                {
                    id: 2,
                    name: 'Author 2',
                },
            ],
            state: 1,
        },
    ],
}

export const mockTagSlice = {
    category: [
        {
            id: 1,
            name: 'Category 1',
        },
        {
            id: 2,
            name: 'Category 2',
        },
    ],
    author: [
        {
            id: 1,
            name: 'Author 1',
        },
        {
            id: 2,
            name: 'Author 2',
        },
    ],
}
