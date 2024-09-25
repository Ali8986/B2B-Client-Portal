import { Button } from "@mui/material";
import FormInput from "../GeneralComponents/FormInput";
import FormBox from "../GeneralComponents/Form-Box";
import LogoBox from "../GeneralComponents/Logo-Box";

const ForgetForm = ({ Default, handleOtp, formData, onChange }) => {
  const handleClick = () => {
    Default();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      handleOtp();
    } else {
      e.target.reportValidity();
    }
  };

  return (
    <FormBox>
      <LogoBox />
      <div className="heading-text mb-2">
        <h2>Enter Email</h2>
      </div>
      <div className="underline my-3"></div>
      <div className="Forget-Email">
        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
          <div className="text-end w-100">
            <a href="#home" className="Back-To-Login" onClick={handleClick}>
              Back to Login
            </a>
          </div>
          <Button variant="contained" className="my-2" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </FormBox>
  );
};

export default ForgetForm;
