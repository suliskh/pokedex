import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Header from "./components/Header/Header";

function MainPage() {
  return (
    <React.Fragment>
      <Header />

      <Container maxWidth="sm">
        <Box sx={{ my: 2 }}>
          {[...new Array(12)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default MainPage;
