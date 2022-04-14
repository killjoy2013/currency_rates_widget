import styled from "@emotion/styled";
import {
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";

const StyledLabel = styled(FormHelperText)({
  marginLeft: 0,
});

const TextInput = (props: TextFieldProps) => {
  const { label, ...others } = props;
  return (
    <FormControl>
      <StyledLabel margin="dense">{label}</StyledLabel>
      <TextField {...others} variant="outlined" size="small" />
    </FormControl>
  );
};

export default TextInput;
