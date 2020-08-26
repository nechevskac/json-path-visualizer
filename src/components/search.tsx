import React, { useRef, useState } from "react";
import injectStore from "./utils/mobx-react";
import { IRootStore } from "../stores/root-store";

import { Box, TextField, InputAdornment } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import { usePrevious } from "./utils/hooks/usePrevious";

import TextAreaComponent from "./text-area";
import LinkComponent from "./link";

type SearchComponentProps = {
  rootStore?: IRootStore;
};

const SearchComponent = injectStore((props: SearchComponentProps) => {
  const {
    dataStore: {
      jsonPathExpression: { setQuery },
    },
    uiStore: { isLoading, startLoading },
  } = props.rootStore!;

  const [userInput, setUserInput] = useState("");
  const previousUserInput = usePrevious(userInput);

  const timerRef = useRef<number | undefined>(undefined);
  const DELAY = 800;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value as string);
  };

  const timer = () => {
    timerRef && window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (userInput !== "$" && userInput !== "$." && userInput !== "$..") {
        setQuery(userInput);
        startLoading();
      } else {
        setQuery("");
      }
    }, DELAY);
  };

  if (userInput !== "" && userInput !== previousUserInput) {
    timer();
  }

  const getValue = () => {
    return userInput === null ? "" : userInput;
  };

  return (
    <Box display="contents">
      <TextField
        value={getValue()}
        placeholder="Enter JSONPath expression"
        onChange={handleChange}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
        disabled={isLoading}
      />
      <LinkComponent />
      <TextAreaComponent />
    </Box>
  );
});

export default SearchComponent;
