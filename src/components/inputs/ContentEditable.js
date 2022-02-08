import React from "react";

export default ({ value, onChange }) => {
  // TODO: conserve cursor position on change
  // TODO: strip dangerous html tags

  return (
    <div
      contentEditable="true"
      onInput={onChange}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};
