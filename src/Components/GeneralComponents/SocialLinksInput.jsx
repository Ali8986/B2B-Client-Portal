import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';

const SocialLinksField = ({ icon: Icon,value, ...props}) => {
  return (
    <TextField
      {...props}
      value={value}
      InputProps={{
        endAdornment:Icon ? (
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
