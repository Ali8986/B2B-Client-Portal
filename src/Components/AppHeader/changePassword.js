import * as React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, IconButton } from "@mui/material";
import { TextField } from "@mui/material";

const ChangePassword = ({ handleClose }) => {
  const [PasssWordVisisbilty, setPasssWordVisisbilty] = React.useState(true);
  const showorHidePassword = () => {
    if (PasssWordVisisbilty) {
      setPasssWordVisisbilty(false);
    } else {
      setPasssWordVisisbilty(true);
    }
  };
  return (
    <>
      <div>
        <div className="text-center">
          <h5>Change Password</h5>
        </div>

        <hr />
        <form>
          <div className="row">
            <div className="col-6">
              <TextField
                InputProps={
                  ({
                    style: {
                      borderRadius: 20,
                    },
                  },
                  {
                    endAdornment: (
                      <div>
                        <IconButton onClick={showorHidePassword}>
                          {PasssWordVisisbilty ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </div>
                    ),
                  })
                }
                type={!PasssWordVisisbilty ? "text" : "password"}
                variant="outlined"
                label="New Password"
                fullWidth
              />
            </div>
            <div className="col-6">
              <TextField
                InputProps={
                  ({
                    style: {
                      borderRadius: 20,
                    },
                  },
                  {
                    endAdornment: (
                      <div>
                        <IconButton onClick={showorHidePassword}>
                          {PasssWordVisisbilty ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </div>
                    ),
                  })
                }
                type={!PasssWordVisisbilty ? "text" : "password"}
                variant="outlined"
                label="Confirm Password"
                fullWidth
              />
            </div>
          </div>
        </form>

        <div className="my-3">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClose}
            sx={{
              borderRadius: "10px",
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
