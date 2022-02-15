import React, { useRef } from 'react'

export default ({ value, onChange, name }) => {
    // TODO: strip dangerous html tags
    const defaultValue = useRef(value)

    const handleChange = (e) => {
        onChange({
            ...e,
            target: {
                ...e.target,
                name,
            },
        })
    }

    return (
        <div
            suppressContentEditableWarning={true}
            contentEditable="true"
            onInput={handleChange}
            dangerouslySetInnerHTML={{ __html: defaultValue.current }}
        />
    )
}
