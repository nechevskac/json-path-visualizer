import React from "react";

import { Box, CircularProgress } from "@material-ui/core";

const CircularProgressComponent = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100%"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
};

export default CircularProgressComponent;
