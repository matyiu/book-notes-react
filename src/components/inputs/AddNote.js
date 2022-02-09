import React, { useState } from 'react'
import { InputTextButton, InputTextIcon } from '../elements/Form'
import Plus from '../icons/Plus'
import { darkTheme } from '../../variables/colors'
import { useDispatch } from 'react-redux'
import { createNote } from '../../redux/notesSlice'

const AddNote = (props) => {
    const icon = (
        <Plus width="24" height="24" color={darkTheme.black.placeholder} />
    )
    const colors = {
        background: darkTheme.accent,
        separator: darkTheme.black.separator,
        text: darkTheme.black.accent,
        placeholder: darkTheme.black.placeholder,
    }

    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const createNoteHandler = (e) => {
        if (e.type === 'click' || e.code === 'Enter') {
            dispatch(
                createNote({
                    title: name,
                    state: 1,
                    permission: 0,
                })
            )
        }
    }

    const changeHandler = (e) => setName(e.target.value)

    return (
        <InputTextButton
            icon={icon}
            colors={colors}
            placeholder="Add notes"
            aria-label="Add notes"
            onKeyDown={createNoteHandler}
            onClickBtn={createNoteHandler}
            value={name}
            onChange={changeHandler}
        />
    )
}

export default AddNote
