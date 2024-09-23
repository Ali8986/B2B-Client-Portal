import { useState } from "react";
import SucessSnackBar from "../Components/SnackBars/SuccessSnackBar";

const HomePage = ({ handleSnackbarClose }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  return (
    <div>
      <h2>Hello World</h2>
      <SucessSnackBar
        open={snackbarOpen}
        handleClose={(handleSnackbarClose = () => setSnackbarOpen(false))}
        message="Login is successful"
        severity="success"
        duration={2000}
      />
    </div>
  );
};

export default HomePage;
