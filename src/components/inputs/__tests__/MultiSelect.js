import React from 'react'
import {
    render,
    fireEvent,
    queryByText,
    getByText,
    wait,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MultiSelect } from '../MultiSelect'

function renderMultiSelect(props) {
    const options = [
        { value: '1', content: 'Option 1' },
        { value: '2', content: 'Option 2' },
        { value: '3', content: 'Option 3' },
        { value: '4', content: 'Option 4' },
    ]

    const { container, getByDisplayValue } = render(
        <MultiSelect options={options} {...props} />
    )

    const selectOptions = container.querySelector('.select-options')
    const selectInputList = container.querySelector('.select-input-list')

    return {
        selectOptions,
        selectInputList,
        getValue: getByDisplayValue,
        getOption: (content) => getByText(selectOptions, content),
        getListElement: (content) => getByText(selectInputList, content),
    }
}

test('Show default values', () => {
    const { selectInputList, getListElement } = renderMultiSelect({
        value: ['1', '2'],
    })
    expect(selectInputList.children.length).toBe(2)
    getListElement('Option 1')
    getListElement('Option 2')
})

test('Call onChange event with selected value', () => {
    const handleChange = jest.fn()
    const { getValue, getOption } = renderMultiSelect({
        value: [],
        onChange: handleChange,
    })
    const input = getValue('')

    input.focus()
    fireEvent.click(getOption('Option 3'))
    expect(handleChange.mock.calls[0][0]).toEqual({
        target: {
            value: '3',
        },
    })

    input.focus()
    fireEvent.click(getOption('Option 4'))
    expect(handleChange.mock.calls[1][0]).toEqual({
        target: {
            value: '4',
        },
    })
})

test('Call onRemoveTag event with clicked value', () => {
    const onRemoveTag = jest.fn()
    const { getListElement } = renderMultiSelect({
        value: ['3', '4'],
        onRemoveTag,
    })

    fireEvent.click(getListElement('Option 3'))
    expect(onRemoveTag.mock.calls[0][1]).toBe('3')

    fireEvent.click(getListElement('Option 4'))
    expect(onRemoveTag.mock.calls[1][1]).toBe('4')
})
