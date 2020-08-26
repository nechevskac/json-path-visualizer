import React from "react";
import injectStore from "./utils/mobx-react";
import { IRootStore } from "../stores/root-store";

import { Alert, AlertTitle } from "@material-ui/lab";

type AlertComponentProps = {
  rootStore?: IRootStore;
};

const AlertComponent = injectStore((props: AlertComponentProps) => {
  const {
    uiStore: { isAlertOpen, handleIsAlertOpen },
  } = props.rootStore!;

  return (
    <>
      {isAlertOpen && (
        <Alert severity="error" onClose={handleIsAlertOpen}>
          <AlertTitle>Error</AlertTitle>
          That file is not JSON. Please upload a JSON file.
        </Alert>
      )}
    </>
  );
});

export default AlertComponent;
