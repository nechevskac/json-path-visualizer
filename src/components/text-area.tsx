import React, { useEffect, useState } from "react";
import injectStore from "./utils/mobx-react";
import { IRootStore } from "../stores/root-store";

import { Box, Tooltip, IconButton } from "@material-ui/core";
import styled from "@material-ui/styles/styled";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import { colorPalette } from "../global-theme";
import CircularProgressComponent from "./circular-progress";

const TextArea = styled(Box)({
  backgroundColor: colorPalette.blue,
  position: "relative",
  borderRadius: "5px",
  marginTop: "1.2rem",
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
  top: "657px",
  position: "fixed",
  backgroundColor: colorPalette.darkGrey,
  opacity: "0.7",
});

const AddIcon = styled(AddRoundedIcon)({
  fontSize: "0.875rem",
  color: colorPalette.green,
});

const RemoveIcon = styled(RemoveRoundedIcon)({
  fontSize: "0.875rem",
  color: colorPalette.green,
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
  const DELAY = 900;

  useEffect(() => {
    setTimeout(() => {
      endLoading();
    }, DELAY);
  });

  const collapseLines = (startIndex: number) => {
    setStartPosition(startIndex + 1);
    let num = 1;
    for (let i = startIndex + 1; i <= getContentByLines().length - 1; i++) {
      if (getContentByLines()[i].includes("}")) {
        num -= 1;
        if (num === 0) {
          setEndPosition(i - 1);
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
            key={line + '_'+ index}
            hide={isLineVisible(index)}
          >
            {startPosition - 1 === index ? (
              <>
                <span>{line}</span>{" "}
                <IconButton onClick={() => [setStartPosition(0), setEndPosition(0)]}>
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
            key={line + '_'+ index}
            hide={isLineVisible(index)}
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

  const isLineVisible = (index: number) => {
    return startPosition !== 0 && endPosition !== 0 && startPosition <= index && endPosition >= index;
  };

  return (
    <TextArea>
      {isLoading ? (
       <CircularProgressComponent />
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
