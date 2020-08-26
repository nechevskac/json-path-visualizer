import React from "react";
import injectStore from "./components/utils/mobx-react";
import { IRootStore } from "./stores/root-store";

import { Box } from "@material-ui/core";
import styled from "@material-ui/styles/styled";

import { colorPalette } from "./global-theme";

const Root = styled(({ transparent, ...props }) => <Box {...props}></Box>)({
  padding: "0px 200px 0px 200px",
  backgroundColor: colorPalette.darkBlue,
  overflow: "auto",
  minHeight: "100vh",
  opacity: (props) => props.transparent && "0.5",
});

type RootWrapperProps = {
  children: object;
  rootStore?: IRootStore;
};

const RootWrapper = injectStore((props: RootWrapperProps) => {
  const { children } = props;
  const {
    uiStore: { isLoading },
  } = props.rootStore!;

  return <Root transparent={isLoading}>{children}</Root>;
});

export default RootWrapper;
