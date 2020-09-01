import { types, IAnyStateTreeNode, getParent } from "mobx-state-tree";
import { JSONPath } from "jsonpath-plus";
import { colorPalette } from "../global-theme";

export const JsonPathExpression = types
  .model("JsonPathExpression", {
    query: types.maybeNull(types.string),
  })
  .views((self) => ({
    get dataStore(): IAnyStateTreeNode {
      return getParent(self);
    },
    getQuery() {
      return self.query;
    },
  }))
  .views((self) => ({
    getExpressionResult() {
      return JSONPath({
        path: self.query as string,
        json: self.dataStore.jsonFile.getFileJSONContent(),
      });
    },
  }))
  .views((self) => ({
    getHighlightedText() {
      let content = JSON.stringify(
        self.dataStore.jsonFile.getFileJSONContent(),
        null,
        "\t"
      );
      if (content === "{}") {
        return "";
      } else {
        if (self.getExpressionResult().length === 0) {
          return content;
        } else {
          self.getExpressionResult().forEach((element: any) => {
            let formattedElement = JSON.stringify(element);
            if (content.includes(formattedElement)) {
              content = content.replace(
                formattedElement,
                `<span style='color:${colorPalette.red};'><strong>${formattedElement}</strong></span>`
              );
            }
          });
        }
      }
      return content;
    },
  }))
  .views((self) => ({
    getContentByLines() {
      return self.getHighlightedText()!.split("\n");
    },
  }))
  .actions((self) => ({
    setQuery(query: string) {
      self.query = query;
    },
  }));
