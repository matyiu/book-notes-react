import React from "react";
import { InputTextButton, InputTextIcon } from "../elements/Form";
import Plus from "../icons/Plus";
import { darkTheme } from "../../variables/colors";

const AddNote = (props) => {
    const icon = <Plus width="24" height="24" color={darkTheme.black.placeholder} />;
    const colors = {
        background: darkTheme.accent,
        separator: darkTheme.black.separator,
        text: darkTheme.black.accent,
        placeholder: darkTheme.black.placeholder
    }

    return (
        <InputTextButton icon={icon} colors={colors} placeholder="Add notes" />
    )
}

export default AddNote;