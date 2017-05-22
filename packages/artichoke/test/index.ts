import "mocha";
import {assert} from "chai";
import {getNotAllowedImports} from "../src";
import * as parser from "../../artichoke-babylon-parser/src";

describe("getNotAllowedImports", () => {

  it("should return imports that are not allowed in the given code", () => {

    const filePath = 'src/Example.js';
    const code = `
      import React, { PropTypes } from 'react';
      import "color-picker";

      export default function Example(props) {
        return (
          <div>
            {props.children}
          </div>
        );
      }

      Example.propTypes = {
        children: PropTypes.shape({}).isRequired,
      };
    `
    
    const artichokeJSON = `
      {
        "constraints": [
          {
            "filePath": "src/Example.js",
            "notAllowedImports": [
              "color-picker"
            ]
          },
          {
            "filePath": "src/Example2.js",
            "notAllowedImports": [
              "lodash"
            ]
          }
        ]
      }
    `

    const notAllowedImports = getNotAllowedImports(code, artichokeJSON, filePath, parser);

    assert.equal(notAllowedImports.length, 1);

    // import "color-picker";
    assert.equal(notAllowedImports[0].moduleName, "color-picker");
    assert.equal(notAllowedImports[0].start, 3);
    assert.equal(notAllowedImports[0].end, 3);

  });
});
