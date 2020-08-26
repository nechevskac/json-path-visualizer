import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "mobx-react";

import { MuiThemeProvider } from "@material-ui/core";

import FileVisualizerComponent from "./components/file-visualizer";
import RootWrapper from "./root-wrapper";
import RootStore from "./stores/root-store";

import GlobalTheme from "./global-theme";

const App = () => {
  const rootStore = RootStore.create();

  return (
    <Provider rootStore={rootStore}>
      <RootWrapper>
        <FileVisualizerComponent />
      </RootWrapper>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={GlobalTheme}>
      <App />
    </MuiThemeProvider>,
  </React.StrictMode>,
  document.getElementById("root")
);
