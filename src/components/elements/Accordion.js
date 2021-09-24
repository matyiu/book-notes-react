import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { darkTheme } from "../../variables/colors";
import Caret from "../icons/Caret";

const Accordion = (props) => {
    const { title, fontSize } = props;

    const [ isOpen, changeIsOpen ] = useState(false);

    const accordionChildrenContainerRef = useRef(null);
    const firstMount = useRef(true);

    const handleOpen = () => changeIsOpen(!isOpen);

    // Open and closing animation
    useEffect(() => {
        if (!firstMount.current) {
            const childrenContainer = accordionChildrenContainerRef.current;
            if (isOpen) {
                childrenContainer.style.maxHeight = childrenContainer.scrollHeight + 'px';
            } else {
                childrenContainer.style.maxHeight = 0;
            }
        } else {
            firstMount.current = false;
        }
    }, [isOpen, accordionChildrenContainerRef]);

    return (
        <AccordionContainer>
            <AccordionButton onClick={handleOpen} fontSize={fontSize} open={isOpen}>
                {title} <Caret width={14} height={14} color={darkTheme.white.text} variant={isOpen ? 'up' : 'down'} />
            </AccordionButton>
            <AccordionChildrenContainer ref={accordionChildrenContainerRef}>
                {props.children}
            </AccordionChildrenContainer>
        </AccordionContainer>
    );
}

const AccordionContainer = styled.div`
    display: block;
`;

const AccordionButton = styled.button`
    color: ${darkTheme.white.text};
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    background: none;
    border: none;
    font-size: ${({ fontSize }) => fontSize ? fontSize : 15}px;
    margin: 0 0 ${({ open }) => open ? '12px' : 0} 0;
    padding: 0;

    &:hover {
        color: ${darkTheme.white.accent};
    }
`;

const AccordionChildrenContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease-in-out;

    & > * {
        margin-bottom: 12px !important;
    }

    & > *:last-child {
        margin: 0;
    }
`;

export default Accordion;