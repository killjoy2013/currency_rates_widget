import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import React from "react";
import Button from "src/components/Button";
import DropdownFrom from "src/components/DropdownFrom";
import Dropdown from "src/components/DropdownFrom";
import DropdownTo from "src/components/DropdownTo";
import TextInput from "src/components/TextInput";

const StyledToolbar = styled(Grid)({
  height: "234px",
});

const StyledEqual = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;

const Toolbar = () => {
  return (
    <StyledToolbar
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-end"
      alignContent="center"
      spacing={4}
    >
      <DropdownFrom />
      <Grid item>
        <TextInput label="Amount" />
      </Grid>
      <Grid item>
        <StyledEqual>=</StyledEqual>
      </Grid>
      <DropdownTo />
      <Grid item>
        <TextInput label="Amount" />
      </Grid>
      <Grid item>
        <Button>Save</Button>
      </Grid>
    </StyledToolbar>
  );
};

export default Toolbar;
