import { TextField } from "@mui/material";

const FormInput = ({
  label,
  type,
  value,
  onChange,
  required = true,
  size = "small",
}) => {
  const autoComplete = type === "password" ? "current-password" : "on";
  return (
    <TextField
      className="my-2"
      type={type}
      variant="outlined"
      size={size}
      label={label}
      fullWidth
      value={value}
      required={required}
      onChange={onChange}
      autoComplete={autoComplete}
    />
  );
};

export default FormInput;
