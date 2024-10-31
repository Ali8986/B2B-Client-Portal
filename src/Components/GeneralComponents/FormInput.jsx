import { TextField } from "@mui/material";

const FormInput = ({
  label,
  name,
  type,
  value,
  onChange,
  required = true,
  multline,
}) => {
  const autoComplete = type === "password" ? "current-password" : "on";
  return (
    <TextField
      className={`my-2`}
      multiline={multline}
      rows={3}
      type={type}
      variant="outlined"
      label={label}
      name={name}
      fullWidth
      value={value}
      required={required}
      onChange={onChange}
      autoComplete={autoComplete}
    />
  );
};

export default FormInput;
