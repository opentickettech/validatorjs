import {
  describe,
  it,
  expect,
} from 'vitest';

const { Validator } = require("./setup.cjs");

describe("same validation rule", function() {
  it("should fail when the 2 attributes are different", function() {
    const validator = new Validator(
      {
        pw: "abc123",
        pw2: "abc1234"
      },
      {
        pw2: "same:pw"
      }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("pw2").message).to.equal("validation.same");
  });

  it("should fail when the the comparing attribute doesnt exist", function() {
    const validator = new Validator(
      {
        pw2: "abc1234"
      },
      {
        pw2: "same:pw"
      }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("pw2").message).to.equal("validation.same");
  });

  it("should pass when the 2 attributes are equal", function() {
    const validator = new Validator(
      {
        pw: "abc123",
        pw2: "abc123"
      },
      {
        pw2: "same:pw"
      }
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass if one of the 2 attributes is a nested path", function() {
    const validator = new Validator(
      {
        payload: {
          pw: "abc123",
          username: "test"
        },
        username: "test"
      },
      {
        username: "same:payload.username"
      }
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should fail if one of the 2 attributes is an invalid nested path", function() {
    const validator = new Validator(
      {
        payload: {
          pw: "abc123",
          username: "test123"
        },
        username: "test"
      },
      {
        username: "same:payload.username"
      }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("username").message).to.equal("validation.same");
  });
});
