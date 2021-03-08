import React, { useEffect, useRef, useState } from "react";

export const Select = (props) => {
    const { options, value, onChange, read } = props; // Props

    // Refs
    const selectRef = useRef(null);
    const customSelectRef = useRef(null);

    // States
    const [ open, setOpen ] = useState(false);
    const [ filteredOptions, setFilteredOptions ] = useState(options);
    const [ searchText, setSearchText ] = useState(value);

    // Event handlers
    const handleClickOpen = () => setOpen(prevOpen => !prevOpen)

    const handleOptionChange = (e, option) => {
        const optionValue = option.value || option.content;
        handleClickOpen();
        setSearchText(optionValue);

        // Change select value firing change event
        const selectValueSetter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
        selectValueSetter.call(selectRef.current, optionValue);
        selectRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const handleSearchChange = (e) => {
        const search = e.target.value;
        setFilteredOptions(options.filter(option =>
            option.content.startsWith(search)
        ));
        setSearchText(search);
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
                    {renderedOptions}
                </div>
            </div>
        </div>
    );
}