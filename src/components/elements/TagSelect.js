import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Dropwdown } from "../elements/Dropdown";
import { fonts } from "../../variables/fonts";
import { darkTheme } from "../../variables/colors";

const TagSelectInput = styled.div`
  font-size: ${fonts.p.size}px;
  line-height: ${fonts.p.lineHeight}px;
  color: ${({ color }) => (color ? color : darkTheme.white.text)};
  margin-right: 15px;
`;

export const TagSelect = (props) => {
  const { options, value, onChange, read } = props; // Props

  // Event handlers
  const handleOptionChange = (e, option) => {
    const optionValue = option.value || option.content;

    closeDropdown();
    onChange && onChange({ target: { value: optionValue } });
    setSelected(option.content);
  };

  const closeDropdown = () => {
    const MousedownEvent = new MouseEvent("mousedown");

    document.dispatchEvent(MousedownEvent);
  };

  // Rendered values
  const renderedOptions = options.map((option) => (
    <div
      onClick={(e) => handleOptionChange(e, option)}
      className="select-option"
    >
      {option.name}
    </div>
  ));

  //   const selectedValue = options.find(
  //     (option) => (option.value || option.name) === value.name
  //   );
  const selectedValue = value && value[0];
  const singleValue = selectedValue ? selectedValue.name : null;

  // State
  const [selected, setSelected] = useState(singleValue);

  const selectInput = (
    <>
      <TagSelectInput
        contenteditable={typeof read === "undefined" ? true : read}
      >
        {selected}
      </TagSelectInput>
    </>
  );

  return (
    <Dropwdown className={props.className} input={selectInput}>
      {renderedOptions}
    </Dropwdown>
  );
};
