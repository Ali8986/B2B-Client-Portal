import { Button } from "@mui/material";
import FormInput from "./FormInput";

const ForgetForm = ({ handleOtp, formData, onChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      handleOtp();
    } else {
      e.target.reportValidity();
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-3 text-center login-form">
      <div className="heading-text">
        <h2>Enter Email</h2>
      </div>
      <div className="underline my-3"></div>
      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
        <Button variant="contained" className="my-2" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ForgetForm;
