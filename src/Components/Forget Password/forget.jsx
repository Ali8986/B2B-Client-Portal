import FormInput from "../GeneralComponents/FormInput";
import FormBox from "../GeneralComponents/Form-Box";
import LogoBox from "../GeneralComponents/Logo-Box";
import { changePasswordApi } from "../../DAL/Login/Login";
import { useState } from "react";
import LoadingButton from "../GeneralComponents/buttonLoadingState";
import { useSnackbar } from "notistack";

const ForgetForm = ({ Default, handleOtp }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleClick = () => {
    Default();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      const formData = {
        email,
        user_type: "company",
      };
      setLoading(true);
      localStorage.setItem("email", email)
      const response = await changePasswordApi(formData);
      if (response.code === 200) {
        handleOtp();
        setLoading(false);
        enqueueSnackbar(response.message, { variant: "success" });
      } else {
        setLoading(false);
        enqueueSnackbar(response.message, { variant: "error" });
      }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-end w-100">
            <a href="#home" className="Back-To-Login" onClick={handleClick}>
              Back to Login
            </a>
          </div>
          <LoadingButton
            type="submit"
            size="large"
            variant="contained"
            className="Loading-BTN mt-3"
            fullWidth
            isLoading={loading}
          >
            Verify Email
          </LoadingButton>
        </form>
      </div>
    </FormBox>
  );
};

export default ForgetForm;
