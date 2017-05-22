import {IImport, IParser} from "../../artichoke-parser";

export interface IArtichokeResult {
  codeConstraints: Array<IImport>;
}

// TODO Think about having a artichokeObject param instead of artichokeJSON
// since clients may want to structure their constraints with xml
export function getNotAllowedImports(code: string, artichokeJSON: string,
  filePath: string, parser: IParser): Array<IImport> {
  const imports = parser.parseImports(code);

  if (imports.length === 0) {
    return [];
  }

  const artichoke = JSON.parse(artichokeJSON);

  const config = artichoke.constraints
  let constraint = config.find(constraint => constraint.filePath === filePath);

  const notAllowedImports: Array<IImport> = findNonAllowedImports(imports, constraint.notAllowedImports);

  return notAllowedImports;
}

function findNonAllowedImports(imports: Array<IImport>,
  notAllowedImports: Array<string>): Array<IImport> {
    let matches: Array<IImport> = [];

    for (const imported of imports) {
        for (const notAllowedImport of notAllowedImports) {
            if (imported.moduleName === notAllowedImport) {
              matches.push(imported);
            }
        }
    }
    return matches;
}
