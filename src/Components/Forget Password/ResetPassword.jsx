import FormInput from "../GeneralComponents/FormInput";
import { useState } from "react";
import FormBox from "../GeneralComponents/Form-Box";
import LogoBox from "../GeneralComponents/Logo-Box";
import { updatePassword } from "../../DAL/Login/Login";
import LoadingButton from "../GeneralComponents/buttonLoadingState";
import { useSnackbar } from "notistack";

const ResetPassword = ({ size, Default, onChange, handleSnackbarClose }) => {
  const Email = localStorage.getItem("email");
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: Email,
    user_type: "company",
    password: "",
    confirm_password: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      setLoading(true);
      const response = await updatePassword(formData);
      if (response.code === 200) {
        enqueueSnackbar(response.message, { variant: "success" });
        Default();
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
        setLoading(false);
      }
    } else {
      enqueueSnackbar("Fields Cannot be Empty", { variant: "error" });
    }
  };
  
  return (
    <FormBox>
      <LogoBox />
      <div className="heading-text py-2">
        <h2>Change Password</h2>
      </div>
      <div className="underline"></div>
      <form onSubmit={handleSubmit}>
        <FormInput
          size={size}
          label="New Password"
          type="password"
          value={formData.password}
          required
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          value={formData.confirm_password}
          onChange={(e) => handleChange("confirm_password", e.target.value)}
          required
        />
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          isLoading={loading}
        >
          Confirm
        </LoadingButton>
      </form>
    </FormBox>
  );
};

export default ResetPassword;
