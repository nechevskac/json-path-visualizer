import { types } from "mobx-state-tree";

const UIStore = types
  .model("UIStore", {
    isAlertOpen: types.boolean,
    isLoading: types.boolean,
  })
  .actions((self) => ({
    handleIsAlertOpen() {
      self.isAlertOpen = !self.isAlertOpen;
    },
    startLoading() {
      self.isLoading = true;
    },
    endLoading() {
      self.isLoading = false;
    },
  }));
export default UIStore;
