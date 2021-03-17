import React from 'react';
import { render, fireEvent, queryByText, getByText, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchSelect } from '../SearchSelect';

function renderSearchSelect(props) {
    const options = [
        {value: '1', content:'Option 1'},
        {value: '2', content:'Option 2'},
        {value: '3', content:'Option 3'},
        {value: '4', content:'Option 4'},
        {value: '5', content:'Option 11'},
        {value: '6', content:'Option 111'},
    ];

    const { container, getByDisplayValue } = render(
        <SearchSelect 
            options={options}
            value="1"
            {...props}
        />
    );

    const select = container.querySelector('.select');
    const selectInput = container.querySelector('.select-input');
    const selectOptions = container.querySelector('.select-options');

    return {
        select,
        selectInput,
        selectOptions,
        getValue: getByDisplayValue,
        queryOption: content => queryByText(selectOptions, content),
        getOption: content => getByText(selectOptions, content),
    };
}

test('Open select on input focus', () => {
    const { select, getValue } = renderSearchSelect();

    const input = getValue('Option 1');
    input.focus();
    expect(select.dataset.open).toBe("true");
});

test('Mantain select open when clicking the input again', () => {
    const { select, selectInput, getValue } = renderSearchSelect();

    const input = getValue('Option 1');
    input.focus();
    expect(select.dataset.open).toBe("true");

    fireEvent.click(selectInput);
    expect(select.dataset.open).not.toBe("false");
});

test('Only show options that starts with search', () => {
    const { selectOptions, getValue } = renderSearchSelect();

    const input = getValue('Option 1');
    fireEvent.change(input, {target: {value: 'Option 1'}});
    Array.from(selectOptions.children).forEach(option => {
        expect(option.textContent).toEqual(expect.stringMatching('Option 1'));
    });

    fireEvent.change(input, {target: {value: 'Option 2'}});
    Array.from(selectOptions.children).forEach(option => {
        expect(option.textContent).not.toEqual(expect.stringMatching('Option 1'));
    });
});

test('Only show create option when input changes', () => {
    const { queryOption, getValue } = renderSearchSelect();
    const input = getValue('Option 1');

    expect(queryOption('Create "Option 1"')).toBeFalsy();

    fireEvent.change(input, {target: {value: 'Option'}});
    expect(queryOption('Create "Option"')).toBeTruthy();
});

test('Keep showing option window when creating', async () => {
    const createHandler = jest.fn();
    const { select, getValue, getOption } = renderSearchSelect({createHandler});
    const input = getValue('Option 1');

    input.focus();
    fireEvent.change(input, {target: {value: 'Option1'}});

    const createOption = getOption('Create "Option1"');
    fireEvent.click(createOption);
    
    await wait(() => expect(select).toHaveAttribute('data-open', 'true'));
});

test('Create option', () => {
    const createHandler = jest.fn();
    const { getValue, getOption } = renderSearchSelect({createHandler});
    const input = getValue('Option 1');

    input.focus();
    fireEvent.change(input, {target: {value: 'Option1'}});
    fireEvent.click(getOption('Create "Option1"'));
    expect(createHandler.mock.calls[0][0]).toBe('Option1');

    fireEvent.change(input, {target: {value: 'Option2'}});
    fireEvent.click(getOption('Create "Option2"'));
    expect(createHandler.mock.calls[1][0]).toBe('Option2');
});

test('Make create option disappear on click outside', () => {
    const { getValue, queryOption, getOption } = renderSearchSelect();
    const input = getValue('Option 1');

    input.focus();
    fireEvent.change(input, {target: {value: 'Option1'}});
    expect(getOption('Create "Option1"')).toBeTruthy();
    
    fireEvent.mouseDown(document.body);
    expect(queryOption('Create "Option1"')).toBeFalsy();
});

test('Restore input value on click outside', () => {
    const { getValue, queryOption, getOption } = renderSearchSelect();
    const input = getValue('Option 1');

    input.focus();
    fireEvent.change(input, {target: {value: 'Option1'}});
    expect(input.value).toBe('Option1');
    
    fireEvent.mouseDown(document.body);
    expect(input.value).toBe('Option 1');
});