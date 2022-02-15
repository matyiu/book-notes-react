import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Dropwdown } from '../elements/Dropdown'
import { fonts } from '../../variables/fonts'
import { darkTheme } from '../../variables/colors'
import Plus from '../icons/Plus'

const TagSelectInput = styled.div`
    font-size: ${fonts.p.size}px;
    line-height: ${fonts.p.lineHeight}px;
    color: ${({ color }) => (color ? color : darkTheme.white.text)};
    margin-right: 15px;
`

export const TagSelect = (props) => {
    const { options, value, onChange, read, onChangeInput, onCreate, name } =
        props // Props

    // Event handlers
    const handleOptionChange = (e, option) => {
        const optionValue = option.value || option.name

        closeDropdown()
        onChange &&
            onChange({
                target: {
                    name,
                    value: {
                        name: optionValue,
                        id: option.id,
                    },
                },
            })
        setSelected(option.name)
    }

    const closeDropdown = () => {
        const MousedownEvent = new MouseEvent('mousedown')

        document.dispatchEvent(MousedownEvent)
    }

    // Rendered values
    const renderedOptions = options.map((option) => {
        return option.id !== null ? (
            <div
                onClick={(e) => handleOptionChange(e, option)}
                className="select-option"
            >
                {option.name}
            </div>
        ) : (
            <div
                onClick={(e) => {
                    handleOptionChange(e, option)
                    onCreate(option)
                }}
                className="select-option"
            >
                <Plus color="white" width="1.5em" height="1.5em" />{' '}
                {option.name}
            </div>
        )
    })

    const selectedValue = value && Array.isArray(value) ? value[0] : value
    const singleValue = selectedValue ? selectedValue.name : null

    // State
    const [selected, setSelected] = useState(singleValue)

    const selectInput = (
        <>
            <TagSelectInput
                contentEditable={typeof read === 'undefined' ? 'true' : !read}
                onInput={
                    typeof read === 'undefined' || read ? onChangeInput : null
                }
            >
                {selected}
            </TagSelectInput>
        </>
    )

    return (
        <Dropwdown className={props.className} input={selectInput}>
            {renderedOptions}
        </Dropwdown>
    )
}
