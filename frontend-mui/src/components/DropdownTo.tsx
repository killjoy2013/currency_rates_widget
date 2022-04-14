import styled from "@emotion/styled";
import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import React from "react";

const StyledLabel = styled(FormHelperText)({
  marginLeft: 0,
});
const StyledSelect = styled(Select)({
  minWidth: "150px",
});

const DropdownTo = (props: SelectProps) => {
  return (
    <Grid item>
      <FormControl size="small">
        <StyledLabel margin="dense" variant="outlined">
          Currency to
        </StyledLabel>
        <StyledSelect {...props}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </StyledSelect>
      </FormControl>
    </Grid>
  );
};

export default DropdownTo;
