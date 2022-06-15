import { module, test } from "qunit";
import Version from "rails-diff/models/version";
import compareVersions from "rails-diff/utils/compare-versions";

function assertEqual(assert: Assert, left: Version, right: Version) {
  assert.strictEqual(compareVersions(left, right), 0, `${left} === ${right}`);
}

function assertLessThan(assert: Assert, left: Version, right: Version) {
  assert.strictEqual(compareVersions(left, right), -1, `${left} < ${right}`);
}

function assertNotEqual(assert: Assert, left: Version, right: Version) {
  assert.notEqual(compareVersions(left, right), 0, `${left} !== ${right}`);
}

function v(version: string) {
  return new Version(version);
}

module("Unit | Utils | compareVersions", () => {
  test("compares SemVer versions", function (assert) {
    assert.expect(6);
    assertLessThan(assert, v("1.0.0-alpha"), v("1.0.0-alpha.1"));
    assertLessThan(assert, v("1.0.0-alpha.1"), v("1.0.0-beta.2"));
    assertLessThan(assert, v("1.0.0-beta.2"), v("1.0.0-beta.11"));
    assertLessThan(assert, v("1.0.0-beta.11"), v("1.0.0-rc.1"));
    assertLessThan(assert, v("1.0.0-rc1"), v("1.0.0"));
    assertLessThan(assert, v("1.0.0-1"), v("1"));
  });

  test("identifies order equality", function (assert) {
    assert.expect(4);
    assertEqual(assert, v("1.2"), v("1.2"));
    assertEqual(assert, v("1.2"), v("1.2.0"));
    assertNotEqual(assert, v("1.2"), v("1.3"));
    assertEqual(assert, v("1.2.b1"), v("1.2.b.1"));
  });
});
