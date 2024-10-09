import "bootstrap/dist/css/bootstrap.min.css";
import { SnackbarProvider } from "notistack";
import Router from "./Routes";
import { ProfileImageProvider } from "./Hooks/createContext";
import { Slide } from "@mui/material";
import styled from "@emotion/styled/macro";
import { MaterialDesignContent } from "notistack";
import { UserProvider } from "./Hooks/adminUser";

function App() {
  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    "&.notistack-MuiContent-success": {
      backgroundColor: "#2D7738",
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: "#970C0C",
    },
  }));

  return (
    <ProfileImageProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        TransitionComponent={Slide}
        maxSnack={3}
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
        }}
      >
        <UserProvider>
          <div className="App">
            <Router />
          </div>
        </UserProvider>
      </SnackbarProvider>
    </ProfileImageProvider>
  );
}

export default App;
