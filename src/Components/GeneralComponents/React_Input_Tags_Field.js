import React from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

function TagsInputField({
  value,
  onChange,
  placeholder,
  disabledInput = false,
  label = "",
}) {
  return (
    <div className='tags-input-field'>
      <label htmlFor='TagsInput'>{label}</label>
      <TagsInput
        id='TagsInput'
        disabled={disabledInput}
        value={value}
        onChange={onChange}
        inputProps={{ placeholder }}
      />
    </div>
  );
}

export default TagsInputField;
