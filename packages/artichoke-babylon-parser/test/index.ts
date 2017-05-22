import "mocha";
import {assert} from "chai";
import {parseImports} from "../src";

describe("parseImports", () => {
  it("should return imports", () => {
    const imports = parseImports(
`
import "a";
import b from "b";
import {c} from "c";
import d, {e} from "f";
import g, {h as hh} from "i";
import * as j from "k";
import l, * as m from "o";
import { p,
         q,
         r,
         s } from "t";
`.trim());

    console.log(imports)
    assert.equal(imports.length, 8);

    // import "a";
    assert.equal(imports[0].moduleName, "a");
    assert.equal(imports[0].start, 1);
    assert.equal(imports[0].end, 1);

    // import b from "b";
    assert.equal(imports[1].moduleName, "b");
    assert.equal(imports[1].start, 2);
    assert.equal(imports[1].end, 2);

    // import {c} from "c";
    assert.equal(imports[2].moduleName, "c");
    assert.equal(imports[2].start, 3);
    assert.equal(imports[2].end, 3);

    // import d, {e} from "f";
    assert.equal(imports[3].moduleName, "f");
    assert.equal(imports[3].start, 4);
    assert.equal(imports[3].end, 4);

    // import g, {h as hh} from "i";
    assert.equal(imports[4].moduleName, "i");
    assert.equal(imports[4].start, 5);
    assert.equal(imports[4].end, 5);

    // import * as j from "k";
    assert.equal(imports[5].moduleName, "k");
    assert.equal(imports[5].start, 6);
    assert.equal(imports[5].end, 6);

    // import l, * as m from "o";
    assert.equal(imports[6].moduleName, "o");
    assert.equal(imports[6].start, 7);
    assert.equal(imports[6].end, 7);

    /* import { p,
             q,
             r,
             s } from "t"; */
    assert.equal(imports[7].moduleName, "t");
    assert.equal(imports[7].start, 8);
    assert.equal(imports[7].end, 11);
  });
});
