import React from 'react';
import { SearchSelect } from './SearchSelect';
import {  } from './Select';

export const MultiSelect = (props) => {
    const { options, value, ...restProps } = props;

    const handleInputSizeKeyDown = (e) => {
        const input = e.target;
        const parent = input.closest('.select-input');
        const spanText = document.createElement('span');
        spanText.textContent = e.target.value;
        parent.appendChild(spanText);
        const textWidth = spanText.offsetWidth + 30;
        input.style.width = Math.max(textWidth, 30) + 'px';
        spanText.remove();
    }

    return (
        <SearchSelect 
            options={options} 
            value={value}
            onKeyDown={handleInputSizeKeyDown}
            defaultOptions={options}
            {...restProps}
        />
    );
}