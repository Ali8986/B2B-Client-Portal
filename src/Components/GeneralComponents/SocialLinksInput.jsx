import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';

const SocialLinksField = ({ icon: Icon,value, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TextField
      {...props}
      value={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      InputProps={{
        endAdornment: isFocused && Icon ? (
          <InputAdornment position="end">
            <IconButton edge="end">
              <Icon />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default SocialLinksField;
