import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useScrollTrigger from "@mui/material/useScrollTrigger";

function Header() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <React.Fragment>
      <AppBar elevation={trigger ? 4 : 0}>
        <Toolbar component={Container} maxWidth="sm">
          <Typography variant="h6" component="div">
            Scroll to elevate App bar
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default Header;
