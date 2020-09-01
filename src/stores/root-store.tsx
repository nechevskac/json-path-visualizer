import { types, Instance } from "mobx-state-tree";

import DataStore from "./data-store";
import UIStore from "./ui-store";

const RootStore = types.model("RootStore", {
  dataStore: types.optional(DataStore, {
    jsonFile: { name: "", content: "" },
    jsonPathExpression: { query: "" },
  }),
  uiStore: types.optional(UIStore, {
    isAlertOpen: false,
    isLoading: false,
  }),
});

export type IRootStore = Instance<typeof RootStore>;

export default RootStore;
