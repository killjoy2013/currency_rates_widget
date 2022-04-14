import React from "react";
import MuiButton from "@mui/material/Button";
import { ButtonProps, Theme, useTheme } from "@mui/material";
import styled from "@emotion/styled";

const Button = (props: ButtonProps) => {
  const theme = useTheme();
  const StyledButton = styled(MuiButton)({
    backgroundColor: theme.palette.buttonColor?.dark,
    color: "white",
    textTransform: "none",
  });
  return <StyledButton {...props}></StyledButton>;
};

export default Button;
