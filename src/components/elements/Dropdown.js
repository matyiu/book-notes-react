import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { darkTheme } from "../../variables/colors";
import { fonts } from "../../variables/fonts";

const DropdownContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    &::placeholder {
        color: ${darkTheme.white.placeholder};
        font-size: ${fonts.p.size}px;
        line-height: 20px;
        font-family: "Roboto Condensed", sans-serif;
    }

    .dropdown-input {
        display: flex;
        align-items: center;
        min-height: 20px;
    }
`;

const DropdownOptionsContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    background: ${darkTheme.primary.input};
    padding: 14px 15px;
    border-radius: 6px;
    margin-top: 10px;
    box-shadow: ${darkTheme.shadow.accent};
    z-index: 1000;
    color: ${darkTheme.white.text};
    width: auto;

    .dropdown-options > * {
        display: block;
        padding: 7px;
        color: ${darkTheme.white.text};
        text-decoration: none;
        cursor: pointer;
        transition: all 0.25s ease-in-out;

        &:hover {
            background: ${darkTheme.accent};
            color: ${darkTheme.white.text};
        }
    }
`;

export const Dropwdown = (props) => {
    const {
        input,
        children,
    } = props; // Props

    // Constants
    const DROPDOWN_OPTIONS_CONTAINER_PADDING = 40;
    const DROPDOWN_OPTIONS_CONTAINER_MAX_WIDTH = 250;

    // Refs
    const dropdownRef = useRef(null);

    // States
    const [ open, setOpen ] = useState(false);

    // Event handlers
    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(prevOpen => !prevOpen);
    }

    // Click outside select handler
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    // Adjust dropdown width to fit the contents
    // To do: avoid dropdown width change when is rendered by react
    useEffect(() => {
        if (open) {
            const optionChildren = dropdownRef.current.querySelectorAll('.dropdown-options > *');
            const dropdownOptionsContainer = dropdownRef.current.querySelector('.dropdown-options-wrapper');

            dropdownOptionsContainer.style.whiteSpace = 'nowrap';

            const maxChildWidth = Array.from(optionChildren).reduce((currWidth, child) => {
                return (currWidth <= child.offsetWidth) ? child.offsetWidth : currWidth;
            }, optionChildren[0].offsetWidth);
    
            dropdownOptionsContainer.style.minWidth = Math.min(maxChildWidth, DROPDOWN_OPTIONS_CONTAINER_MAX_WIDTH) + DROPDOWN_OPTIONS_CONTAINER_PADDING + 'px';

            dropdownOptionsContainer.style.whiteSpace = 'normal';
        }
    }, [open]);

    const options = (
        <DropdownOptionsContainer className="dropdown-options-wrapper">
                <div className="dropdown-options">
                    { children }
                </div>
        </DropdownOptionsContainer>
    );

    return (
        <DropdownContainer className={"dropdown " + props.className} ref={dropdownRef}>
            <div className="dropdown-input" onClick={handleClickOpen}>
                { input }
            </div>
            { open ? options : null }
        </DropdownContainer>
    );
}