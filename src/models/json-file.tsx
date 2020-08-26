import { types } from "mobx-state-tree";

export const JsonFile = types
  .model("JsonFile", {
    name: types.maybeNull(types.string),
    content: types.maybeNull(types.string),
  })
  .views((self) => ({
    getFileContent() {
      return self.content as string;
    },    
    getFileJSONContent() {
      let text = {};
      if (self.content !== '') {
        text = JSON.parse(self.content as string)
      }
      return text;
    },
  }))
  .actions((self) => ({
    setJsonFile(name: string, content: string) {
      self.name = name;
      self.content = content;
    },
  }));
