import React, { useRef } from "react";

export default ({ value, onChange }) => {
  // TODO: strip dangerous html tags
  const defaultValue = useRef(value);

  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div
      contentEditable="true"
      onInput={handleChange}
      dangerouslySetInnerHTML={{ __html: defaultValue.current }}
    />
  );
};
