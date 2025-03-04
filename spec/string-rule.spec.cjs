import {
  describe,
  it,
  expect,
} from 'vitest';

const { Validator } = require("./setup.cjs");

describe("string validation rule", function() {
  it("should pass when the input is a string", function() {
    const validator = new Validator({ name: "David" }, { name: "string" });

    expect(validator.passes()).to.be.true;
  });

  it("should fail when the input is not a string", function() {
    const validator = new Validator({ name: 5 }, { name: "string" });

    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("name").message).to.equal("validation.string");
  });
});
