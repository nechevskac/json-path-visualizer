import React, { useEffect } from "react";
import injectStore from "./utils/mobx-react";
import { IRootStore } from "../stores/root-store";

import {
  Box,
  CircularProgress,
  Tooltip,
  IconButton,
  styled
} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

import { colorPalette } from "../global-theme";

const TextArea = styled(Box)({
  backgroundColor: colorPalette.blue,
  position: "relative",
  borderRadius: "5px",
  marginTop: "1.5rem",
  height: "30rem",
  width: "65%",
  minWidth: "20rem",
  color: colorPalette.white,
  overflow: "scroll",
  "&:hover": {
    boxShadow: "0 0px 10px 0 " + colorPalette.darkGrey,
  },
});

const DeleteIcon = styled(IconButton)({
  top: "635px",
  position: "fixed",
  backgroundColor: colorPalette.darkGrey,
  opacity: "0.7",
});

type TextAreaComponentProps = {
  rootStore?: IRootStore;
};

const TextAreaComponent = injectStore((props: TextAreaComponentProps) => {
  const {
    dataStore: {
      jsonFile: { getFileContent, setJsonFile },
      jsonPathExpression: { getHighlightedText },
    },
    uiStore: { isLoading, endLoading },
  } = props.rootStore!;

  useEffect(() => {
    setTimeout(() => {
      endLoading();
    }, 900);
  });

  return (
    <TextArea>
      {isLoading ? (
        <Box display="flex"
        justifyContent="center"
        height="100%"
        alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div dangerouslySetInnerHTML={{ __html: getHighlightedText() }}></div>
          {getFileContent() !== "" && (
            <DeleteIcon onClick={() => setJsonFile("", "")}>
              <Tooltip title="Clear JSON" placement="top">
                <DeleteOutlinedIcon />
              </Tooltip>
            </DeleteIcon>
          )}
        </>
      )}
    </TextArea>
  );
});

export default TextAreaComponent;
