import React from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

function TagsInputField({ value, onChange, placeholder }) {
  return (
    <div className='tags-input-field'>
      <TagsInput
        value={value}
        onChange={onChange}
        inputProps={{ placeholder }}
      />
    </div>
  );
}

export default TagsInputField;
