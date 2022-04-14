import { Grid } from "@mui/material";
import React from "react";
import Main from "./Main";
import Toolbar from "./Toolbar";

const index = () => {
  return (
    <Grid container flexDirection="column">
      <Toolbar />
      <Main />
    </Grid>
  );
};

export default index;
