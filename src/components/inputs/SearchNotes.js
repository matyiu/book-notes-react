import React from "react";
import { InputTextIcon } from "../elements/Form";
import Search from "../icons/Search";
import { darkTheme } from "../../variables/colors";

const SearchNotes = (props) => {
    return (
        <InputTextIcon placeholder="Search notes" icon={<Search width="19" height="19" color={darkTheme.white.placeholder} className="input-icon" />} />
    )
}

export default SearchNotes;