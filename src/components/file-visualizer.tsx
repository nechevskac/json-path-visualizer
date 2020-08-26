import React from "react";

import { Box, Typography } from "@material-ui/core";

import AlertComponent from "./alert";
import FileUploadComponent from "./file-upload";
import SearchComponent from "./search";

const FileVisualizerComponent = () => {

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      width="100%"
      mt={2}
    >
      <Typography variant="h1">JSONPath Visualizer</Typography>
      <FileUploadComponent />
      <SearchComponent />
      <AlertComponent />
    </Box>
  );
};

export default FileVisualizerComponent;
