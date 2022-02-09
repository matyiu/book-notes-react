import React from 'react'
import { render, fireEvent, getByText } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Select } from '../Select'

function renderSelect(props) {
    const options = [
        { value: '1', content: 'Option 1' },
        { value: '2', content: 'Option 2' },
        { value: '3', content: 'Option 3' },
        { value: '4', content: 'Option 4' },
    ]

    const { container, getByDisplayValue } = render(
        <Select options={options} {...props} />
    )

    const select = container.querySelector('.select')
    const selectOptions = container.querySelector('.select-options')
    const selectInput = container.querySelector('.select-input')

    return {
        options,
        select,
        selectInput,
        getValue: getByDisplayValue,
        getOption: (content) => getByText(selectOptions, content),
    }
}

test('if it renders correctly', () => {
    const { getOption, getValue } = renderSelect({ value: '1' })

    expect(getOption('Option 1')).toBeTruthy()
    expect(getOption('Option 2')).toBeTruthy()
    expect(getValue('Option 1')).toBeTruthy()
})

test('open/close when select click event', () => {
    const { selectInput, select } = renderSelect({ value: '1' })

    fireEvent.click(selectInput)
    const isOpen = select.dataset.open
    expect(isOpen).toBe('true')

    fireEvent.click(selectInput)
    const isClose = select.dataset.open
    expect(isClose).toBe('false')
})

test('close when click outside event', () => {
    const { selectInput, select } = renderSelect({ value: '1' })

    fireEvent.click(selectInput)

    fireEvent.mouseDown(document.body)
    const isClose = select.dataset.open
    expect(isClose).toBe('false')
})

test('change value when option click event', () => {
    const onChange = jest.fn()
    const { selectInput, getOption } = renderSelect({ value: '1', onChange })

    fireEvent.click(selectInput)
    fireEvent.click(getOption('Option 2'))

    expect(onChange.mock.calls[0][0]).toEqual({
        target: { value: '2' },
    })
})
