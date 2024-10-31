import "bootstrap/dist/css/bootstrap.min.css";
import { SnackbarProvider } from "notistack";
import Router from "./Routes";
import { ProfileImageProvider } from "./Hooks/createContext";
import { Slide } from "@mui/material";
import styled from "@emotion/styled/macro";
import { MaterialDesignContent } from "notistack";
// import CloseIcon from "@mui/icons-material/Close";
import { UserProvider } from "./Hooks/adminUser";
// import WarningIcon from "@mui/icons-material/Warning";

function App() {
  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    "&.notistack-MuiContent-success": {
      backgroundColor: "#2D7738",
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: "#970C0C",
    },
  }));

  // const CloseButton = ({ snackbarKey }) => {
  //   const { closeSnackbar } = useSnackbar();
  //   return (
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       className="Snackbar_Close_Btn"
  //       onClick={() => closeSnackbar(snackbarKey)} // Ensure the snackbarKey is passed here
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   );
  // };

  return (
    <ProfileImageProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        TransitionComponent={Slide}
        maxSnack={3}
        // action={(snackbarKey) => <CloseButton snackbarKey={snackbarKey} />}
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
        }}
      >
        <UserProvider>
          <div className='App'>
            <Router />
          </div>
        </UserProvider>
      </SnackbarProvider>
    </ProfileImageProvider>
  );
}

export default App;
