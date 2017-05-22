export interface IParser {
    parseImports(code: string): Array<IImport>;
}

export interface IImport {
  start: number;
  end: number;
  moduleName: string;
}
