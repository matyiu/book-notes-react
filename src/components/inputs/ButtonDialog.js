import React, { useRef, useState, useEffect } from 'react'

export const ButtonDialog = (props) => {
    const { className, btnText, containerClassName } = props

    // States
    const [open, setOpen] = useState(false)

    // Refs
    const container = useRef(null)

    // Event Handlers
    const handleOpenDialog = () => setOpen(!open)

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (container.current && !container.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    })

    return (
        <div
            className={'button-dialog-container ' + containerClassName}
            data-open={open}
            ref={container}
        >
            <button className={className} onClick={handleOpenDialog}>
                {btnText}
            </button>
            <div className="button-dialog-wrapper">
                <div className="button-dialog">{props.children}</div>
            </div>
        </div>
    )
}
