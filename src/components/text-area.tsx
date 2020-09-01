import React, { useEffect, useState } from "react";
import injectStore from "./utils/mobx-react";
import { IRootStore } from "../stores/root-store";

import { Box, CircularProgress, Tooltip, IconButton } from "@material-ui/core";
import styled from "@material-ui/styles/styled";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
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
  overflowY: "auto",
  "&:hover": {
    boxShadow: "0 0px 10px 0 " + colorPalette.darkGrey,
  },
});

const DeleteIcon = styled(IconButton)({
  top: "653px",
  position: "fixed",
  backgroundColor: colorPalette.darkGrey,
  opacity: "0.7",
});

const AddIcon = styled(AddRoundedIcon)({
  fontSize: "0.875rem",
  color: colorPalette.darkBlue,
});

const RemoveIcon = styled(RemoveRoundedIcon)({
  fontSize: "0.875rem",
  color: colorPalette.darkBlue,
});

const TextLine = styled(({ hide, color, ...props }) => <div {...props}></div>)({
  whiteSpace: "pre",
  display: (props) => (props.hide ? "none" : "flex"),
  color: (props) => (props.color ? colorPalette.red : colorPalette.white),
  alignItems: "center",
});

type TextAreaComponentProps = {
  rootStore?: IRootStore;
};

const TextAreaComponent = injectStore((props: TextAreaComponentProps) => {
  const {
    dataStore: {
      jsonFile: { getFileContent, setJsonFile },
      jsonPathExpression: { getContentByLines },
    },
    uiStore: { isLoading, endLoading },
  } = props.rootStore!;

  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(0);
  const [isLineVisible, setIsLineVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      endLoading();
    }, 900);
  });

  const collapseLines = (startIndex: number) => {
    setStartPosition(startIndex + 1);
    let num = 1;
    for (let i = startIndex + 1; i <= getContentByLines().length - 1; i++) {
      if (getContentByLines()[i].includes("}")) {
        num -= 1;
        if (num === 0) {
          setEndPosition(i - 1);
          setIsLineVisible(!isLineVisible);
          break;
        }
      } else if (getContentByLines()[i].includes("{")) {
        num += 1;
      }
    }
  };

  const getFormattedContent = () => {
    const formattedContent = getContentByLines().map((line, index) => {
      if (line.includes("{")) {
        return (
          <TextLine
            key={line + index}
            hide={
              startPosition <= index && endPosition >= index && isLineVisible
            }
          >
            {isLineVisible && startPosition - 1 === index ? (
              <>
                <span>{line}</span>{" "}
                <IconButton onClick={() => setIsLineVisible(!isLineVisible)}>
                  <AddIcon />
                </IconButton>
              </>
            ) : (
              <>
                <span>{line}</span>{" "}
                <IconButton onClick={() => collapseLines(index)}>
                  <RemoveIcon />
                </IconButton>
              </>
            )}
          </TextLine>
        );
      } else {
        return (
          <TextLine
            key={line + index}
            hide={
              startPosition <= index && endPosition >= index && isLineVisible
            }
            color={line.includes("span")}
          >
            <span>
              {line
                .replace("<span style='color:#f44336;'><strong>", "")
                .replace("</strong></span>", "")}
            </span>
          </TextLine>
        );
      }
    });
    return formattedContent;
  };

  return (
    <TextArea>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          height="100%"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {getFormattedContent()}
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
