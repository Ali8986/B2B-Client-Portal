import { useState } from "react";
import SucessSnackBar from "../Components/SnackBars/SuccessSnackBar";
const HomePage = ({ handleSnackbarClose }) => {
  const page = JSON.parse(localStorage.getItem("SnackBarOpeningCount"));
  const [snackbarOpen, setSnackbarOpen] = useState(page);

  setTimeout(() => {
    if (page === true) {
      setSnackbarOpen(false);
      localStorage.setItem("SnackBarOpeningCount", JSON.stringify(false));
    }
  }, 1000);

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
