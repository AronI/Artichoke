import {parse} from "babylon";
import traverse from "babel-traverse";
import {IImport} from "../../artichoke-parser";

export function parseImports(code: string): Array<IImport> {
  const parsed = parse(code, {
    sourceType: "module",
    plugins: [
      "jsx",
      "flow",
      "doExpressions",
      "objectRestSpread",
      "decorators",
      "classProperties",
      "exportExtensions",
      "asyncGenerators",
      "functionBind",
      "functionSent",
    ],
  });

  const importModules: Array<IImport> = [];

  traverse(parsed, {
    ImportDeclaration(path) {
      const node = path.node;
      let start = node.loc.start.line;
      let end = node.loc.end.line;

      const imported: IImport = {
        start,
        end,
        moduleName: node.source.value,
      };

      importModules.push(imported);
    },
  });
  return importModules;
}
