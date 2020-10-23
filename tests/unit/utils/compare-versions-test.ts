import { module, test } from "qunit";
import compareVersions from "rails-diff/utils/compare-versions";

module("Unit | Utils | compareVersions", () => {
  test("returns expected results", (assert) => {
    const versions: [string, string, number][] = [
      ["1.2.0", "1.2", 0],
      ["1.4", "1.7.2", -1],
      ["1.2pre", "1.2", -1],
      ["1.7", "1.1.1", 1],
      ["1.7.9RC1", "1.7.9RC2", -1],
      ["1.7.9RC1", "1.7.9RC", 1],
      ["1.7.9RC1", "1.7.9", -1],
      ["0.4beta", "0.4", -1],
      ["0.4beta", "0.4alpha", 1],
      ["0.4b", "0.4b", 0],
      ["0.0.1", "0.0.0.1", 1],
    ];

    versions.forEach(([a, b, expected]) => {
      assert.equal(
        compareVersions(a, b),
        expected,
        `${a} <=> ${b} === ${expected}`
      );
    });
  });
});
