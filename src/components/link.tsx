import React from "react";

import { Box, Typography, styled } from "@material-ui/core";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";

import { colorPalette } from "../global-theme";

const Link = styled("a")({
  textDecoration: "unset",
  "&:hover,&:focus": {
    textDecorationColor: colorPalette.lightBlue,
    textDecoration: "underline",
  },
});

const ArrowIcon = styled(KeyboardArrowRightRoundedIcon)({
  color: colorPalette.lightBlue,
});

const LinkComponent = () => {
  return (
    <Box display="flex" alignItems="center" mt={2}>
      <ArrowIcon />
      <Link href="https://restfulapi.net/json-jsonpath/" target="_blank">
        <Typography variant="caption">See JSONPath Syntax</Typography>
      </Link>
    </Box>
  );
};

export default LinkComponent;
