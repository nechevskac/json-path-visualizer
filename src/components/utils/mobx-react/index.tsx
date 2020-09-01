import { observer, inject } from "mobx-react";
import { IReactComponent } from "mobx-react/dist/types/IReactComponent";

const injectStore = (component: IReactComponent) =>
  inject("rootStore")(observer(component));

export default injectStore;
