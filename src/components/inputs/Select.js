import React, { useEffect, useRef, useState } from "react";

export const Select = (props) => {
    const { 
        options, 
        value, 
        onChange, 
        read,
        onCreate,
        onSearch,
        inputValue,
        onClose,
        create,
        onKeyDown,
        defaultOptions,
        onRemoveTag
    } = props; // Props

    // Refs
    const customSelectRef = useRef(null);

    // States
    const [ open, setOpen ] = useState(false);

    // Event handlers
    const handleClickOpen = () => setOpen(prevOpen => !prevOpen)

    const handleOptionChange = (e, option) => {
        const optionValue = option.value || option.content;
        handleClickOpen();
        onChange({target: {value: optionValue} });
    }

    // Rendered values
    const renderedOptions = options.map(option =>
        <div 
            onClick={(e) => handleOptionChange(e, option)} 
            className="select-option"
        >
            {option.content}
        </div>
    )
    const createOption = (
        <div 
            className="select-option select-create"
            onClick={onCreate}
        >
            <i className="fas fa-plus"></i>
            Create "{inputValue}"
        </div>
    );

    const valueOptions = defaultOptions || options;

    const singleValue = (typeof value === 'string') && 
        valueOptions.find(option => (option.value || option.content) === value).content;

    const multipleValue = Array.isArray(value) && 
        value.map(id => valueOptions.find(option => (option.value || option.content) === id));

    const renderedValuePill = multipleValue && multipleValue.map(option => (
        <li className="pill" onClick={(e) => {
            onRemoveTag(e, option.value);
        }}>{option.content}</li>
    ));

    // Click outside select handler
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (customSelectRef.current && !customSelectRef.current.contains(e.target)) {
                setOpen(false);
                onClose && onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    return (
        <div className="select" data-open={open} ref={customSelectRef}>
            <div className="select-input" onClick={handleClickOpen}>
                {renderedValuePill && (
                    <ul className="select-input-list">
                        {renderedValuePill}
                    </ul>
                )}
                <input type="text" 
                    value={(typeof inputValue !== 'undefined') ?
                        inputValue : singleValue} 
                    readOnly={(typeof read === 'undefined') ? true : read } 
                    onChange={onSearch}
                    onKeyDown={onKeyDown} 
                />
                <i className="fas fa-angle-down"></i>
            </div>
            <div className="select-options-wrapper">
                <div className="select-options">
                    {(create && inputValue.length > 0) && createOption}
                    {renderedOptions}
                </div>
            </div>
        </div>
    );
}