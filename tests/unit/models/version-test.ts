import { module, test } from "qunit";
import Version from "rails-diff/models/version";

import { setupTest } from "../../helpers";

module("Unit | Models | Version", (hooks) => {
  setupTest(hooks);

  test("errs when initialized with invalid values", function (assert) {
    assert.expect(5);

    [
      "junk",
      "1.0\n2.0",
      "1..2",
      "1.2 3.4",
      "2.3422222.222.222222222.22222.ads0as.dasd0.ddd2222.2.qd3e.",
    ].forEach((version) => {
      assert.throws(
        () => {
          new Version(version);
        },
        /Malformed version number string/,
        `Throws an error given "${version}"`
      );
    });
  });

  test("normalizes the given version string", function (assert) {
    assert.expect(7);

    ["1.0", "1.0 ", " 1.0 ", "1.0\n", "\n1.0\n", "1.0"].forEach((version) => {
      assert.strictEqual(
        new Version(version).toString(),
        "1.0",
        `Accepts "${version}"`
      );
    });

    assert.strictEqual(new Version("1").toString(), "1", 'Accepts "1"');
  });
});
