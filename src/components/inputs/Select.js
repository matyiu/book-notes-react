import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Dropwdown } from "../elements/Dropdown";
import { InputText } from "../elements/Form";

const SelectInput = styled(InputText)`
    min-width: 240px;

    & + i {
        position: absolute;
        right: 15px;
    }
`;

export const Select = (props) => {
    const { 
        options, 
        value, 
        onChange, 
        read,
    } = props; // Props

    // Event handlers
    const handleOptionChange = (e, option) => {
        const optionValue = option.value || option.content;

        closeDropdown();
        onChange && onChange({ target: { value: optionValue } });
        setSelected(option.content);
    }

    const closeDropdown = () => {
        const MousedownEvent = new MouseEvent('mousedown');

        document.dispatchEvent(MousedownEvent);
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

    const selectedValue = options.find(option => (option.value || option.content) === value);
    const singleValue = selectedValue !== undefined ? selectedValue.content : null;

    // State
    const [ selected, setSelected ] = useState(singleValue);

    const selectInput = (
        <>
            <SelectInput 
                value={selected} 
                readOnly={(typeof read === 'undefined') ? true : read }
            />
            <i className="fas fa-angle-down"></i>
        </>
    );

    return (
        <Dropwdown className={props.className} input={selectInput}>
            {renderedOptions}
        </Dropwdown>
    );
}