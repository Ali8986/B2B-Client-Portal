import { TextField } from "@mui/material";

const FormInput = ({ label, type, value, onChange, required = true }) => {
  const autoComplete = type === "password" ? "current-password" : "on";
  return (
    <TextField
      className="my-2"
      type={type}
      variant="outlined"
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
