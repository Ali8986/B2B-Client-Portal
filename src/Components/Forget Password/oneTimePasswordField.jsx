import { useState } from "react";
import FormBox from "../GeneralComponents/Form-Box";
import { MuiOtpInput } from "mui-one-time-password-input";
import LogoBox from "../GeneralComponents/Logo-Box";
import { confirmPinCode } from "../../DAL/Login/Login";
import LoadingButton from "../GeneralComponents/buttonLoadingState";
import { useSnackbar } from "notistack";

const OTP = ({ Default, Confirm }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const handleClick = () => {
    Default();
  };
  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  const Email = localStorage.getItem("email");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email:Email,
      verification_code: otp,
      user_type: "company",
    };
    setLoading(true);
    const response = await confirmPinCode(formData);
    if (response && response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      Confirm();
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormBox>
        <LogoBox />
        <div className="heading-text">
          <h2 className="text-decoration-underline">Email Verification Code</h2>
          <p>We have sent a code to your email</p>
        </div>
        <div>
          <MuiOtpInput
            value={otp}
            TextFieldsProps={() => ({ size: "small" })}
            onChange={handleChange}
            className="my-2 px-4 otp-input"
            length={6}
          />
        </div>
        <div className="text-end w-100 px-4 py-0 my-0">
          <a href="#home" className="Back-To-Login" onClick={handleClick}>
            Back to Login
          </a>
        </div>
        <div className="w-100">
          <LoadingButton
            type="submit"
            size="large"
            variant="contained"
            className="Loading-BTN mt-3"
            fullWidth
            isLoading={loading}
          >
            Verify Account
          </LoadingButton>
        </div>
      </FormBox>
    </form>
  );
};

export default OTP;
