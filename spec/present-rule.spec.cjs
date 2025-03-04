import {
  describe,
  it,
  expect,
} from 'vitest';

const { Validator } = require("./setup.cjs");

describe("present validation rule", function() {
  it("should pass with attribute present", function() {
    const validator = new Validator({ email: "name@domain.com" }, { email: "present" });
    expect(validator.passes()).to.be.true;
  });

  it("should fail with attribute not present", function() {
    const validator = new Validator({}, { email: "present" });
    expect(validator.passes()).to.be.false;
  });
});
