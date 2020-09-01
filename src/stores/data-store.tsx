import { types } from "mobx-state-tree";

import { JsonFile } from "../models/json-file";
import { JsonPathExpression } from "../models/json-path-expression";

const DataStore = types.model("DataStore", {
  jsonFile: JsonFile,
  jsonPathExpression: JsonPathExpression,
});

export default DataStore;
