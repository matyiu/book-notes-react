import React, { useEffect, useRef, useState } from "react";

export const Select = (props) => {
    const { 
        options, 
        value, 
        onChange, 
        read,
        createHandler
    } = props; // Props

    // Refs
    const selectRef = useRef(null);
    const customSelectRef = useRef(null);

    // States
    const [ open, setOpen ] = useState(false);
    const [ filteredOptions, setFilteredOptions ] = useState(options);
    let inputValue = value;
    if (options[0].value) {
        const optionValue = options.find(option => option.value === value);
        inputValue = optionValue.content;
    }
    const [ searchText, setSearchText ] = useState(inputValue);
    const [ create, setCreate ] = useState(false);

    // Helper functions
    const selectFireChangeEvt = (value) => {
        // Change select value firing change event
        const selectValueSetter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
        selectValueSetter.call(selectRef.current, value);
        selectRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const filterOptions = search => {
        return options.filter(option =>
            option.content.startsWith(search)
        );
    }

    // Event handlers
    const handleClickOpen = () => setOpen(prevOpen => !prevOpen)

    const handleOptionChange = (e, option) => {
        const optionValue = option.value || option.content;
        handleClickOpen();
        setSearchText(option.content);
        setCreate(false);

        selectFireChangeEvt(optionValue);
    }

    const handleSearchChange = (e) => {
        const search = e.target.value;
        setFilteredOptions(filterOptions(search));
        setSearchText(search);
        setCreate(true);
    }

    const handleCreateOption = () => {
        setCreate(false);
        createHandler(searchText);

        customSelectRef.current.querySelector('input[type="text"]').focus();
    }

    // Custom Select Options
    const renderedOptions = filteredOptions.map(option =>
        <div 
            onClick={(e) => handleOptionChange(e, option)} 
            className="select-option"
        >
            {option.content}
        </div>
    )
    const createOption = (create && searchText.length > 0) ? (
        <div 
            className="select-option select-create"
            onClick={handleCreateOption}
        >
            <i className="fas fa-plus"></i>
            Create "{searchText}"
        </div>
    ) : null;

    // Click outside select handler
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (customSelectRef.current && !customSelectRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    // Update filteredOptions when props options changes
    useEffect(() => {
        setFilteredOptions(options.filter(option =>
            option.content.startsWith(searchText)
        ));
    }, [options, searchText]);

    return (
        <div className="select" data-open={open} ref={customSelectRef}>
            <div className="select-hidden">
                <select 
                    value={value} 
                    onChange={onChange}
                    ref={selectRef}
                >
                    {options.map(option => 
                        (<option value={option.value || option.content}>
                            {option.content}
                        </option>)
                    )}
                </select>
            </div>
            <div className="select-input" onClick={handleClickOpen}>
                <input type="text" 
                    value={searchText} 
                    readOnly={(typeof read === 'undefined') ? true : read } 
                    onChange={handleSearchChange} 
                />
                <i className="fas fa-angle-down"></i>
            </div>
            <div className="select-options-wrapper">
                <div className="select-options">
                    {createOption}
                    {renderedOptions}
                </div>
            </div>
        </div>
    );
}