import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const LoadingIndicator = () => {
  return (
    <Backdrop sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })} open={true}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default LoadingIndicator;
