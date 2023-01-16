import {
  describe,
  it,
} from 'vitest';

const { Validator, expect } = require("./setup.js");

describe("required without all", function() {
  it("should fail", function() {
    const validator = new Validator(
      {
        flavour: ""
      },
      {
        flavour: "required_without_all:desert.first,desert.second"
      }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("flavour")).to.equal(
      "validation.required.without.all"
    );
  });

  it("should pass", function() {
    const validator = new Validator(
      {
        flavour: "chocolate"
      },
      {
        flavour: "required_without_all:desert.first,desert.second"
      }
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass (not all required field are set)", function() {
    const validator = new Validator(
      {
        desert: {
          first: "icecream"
        },
        flavour: ""
      },
      {
        flavour: "required_without_all:desert.first,desert.second"
      }
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
