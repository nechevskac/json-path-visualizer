import React, { useRef } from "react";
import injectStore from "./utils/mobx-react";
import { IRootStore } from "../stores/root-store";

import { Box, Typography, Tooltip, IconButton, styled } from "@material-ui/core";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import FolderOpenOutlinedIcon from "@material-ui/icons/FolderOpenOutlined";
import { colorPalette } from "../global-theme";

const CheckIcon = styled(CheckRoundedIcon)({
  color: colorPalette.green,
  marginLeft: '1rem'
});

type FileUploadComponentProps = {
  rootStore?: IRootStore;
};

const FileUploadComponent = injectStore((props: FileUploadComponentProps) => {
  const {
    dataStore: {
      jsonFile: { setJsonFile, getFileContent },
    },
    uiStore: { handleIsAlertOpen, startLoading, isLoading },
  } = props.rootStore!;

  const hiddenFileInput = useRef<any>(null);

  const handleClick = () => {
    hiddenFileInput && hiddenFileInput.current!.click();
  };

  const fileSelectedHandler = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "application/json" || file.type === ".json") {
        startLoading();
        const reader = new FileReader();
        reader.onload = () => {
          setJsonFile(file.name, reader.result as string);
        };
        reader.readAsText(file);
      } else {
        handleIsAlertOpen();
      }
    }
  };

  return (
    <Box display="flex" alignItems="center" mt={2} mb={2}>
      <input
        ref={hiddenFileInput}
        type="file"
        accept=".json,application/json"
        onChange={(event) => fileSelectedHandler(event)}
        style={{ display: "none" }}
        disabled={isLoading}
      />
      <IconButton onClick={handleClick}>
        <Tooltip title="Upload JSON file" placement="top">
          <FolderOpenOutlinedIcon />
        </Tooltip>
      </IconButton>
      <Typography>Upload a JSON file</Typography>
      {getFileContent() !== '' && <CheckIcon />}
    </Box>
  );
});

export default FileUploadComponent;
