import { Registry as ServiceRegistry } from "@ember/service";
import { TestContext } from "@ember/test-helpers";
import { module, test } from "qunit";
import Version from "rails-diff/models/version";
import { setupTest } from "rails-diff/tests/helpers";

function getVersionsService(
  context: TestContext,
  versions: Version[]
): ServiceRegistry["versions"] {
  const service = context.owner.lookup(
    "service:versions"
  ) as ServiceRegistry["versions"];
  service.setVersions(versions);
  return service;
}

module("Unit | Services | Versions", function (hooks) {
  setupTest(hooks);

  module("setSource", function () {
    test("changes the source to a given, known sources version", function (assert) {
      const versionsService = getVersionsService(this, [
        new Version("3"),
        new Version("2"),
        new Version("1"),
      ]);

      assert.deepEqual(versionsService.sources, ["2", "1"]);

      versionsService.setSource("1");

      assert.strictEqual(versionsService.source, "1");

      versionsService.setSource("2");

      assert.strictEqual(versionsService.source, "2");
    });

    test("changes the target version when set to a version equal or more recent than the current target", function (assert) {
      const versionsService = getVersionsService(this, [
        new Version("3"),
        new Version("2"),
        new Version("1"),
      ]);

      versionsService.setSource("1");
      versionsService.setTarget("2");

      assert.strictEqual(versionsService.source, "1");
      assert.strictEqual(versionsService.target, "2");

      versionsService.setSource("2");

      assert.strictEqual(versionsService.source, "2");
      assert.strictEqual(versionsService.target, "3");
    });

    test("throws an error when given an unrecognized source version", function (assert) {
      const versionsService = getVersionsService(this, [
        new Version("3"),
        new Version("2"),
        new Version("1"),
      ]);

      assert.throws(() => {
        versionsService.setSource("bad");
      }, "Given source version is unrecognized");
    });
  });

  module("setTarget", function () {
    test("changes the target to a given, known targets version", function (assert) {
      const versionsService = getVersionsService(this, [
        new Version("3"),
        new Version("2"),
        new Version("1"),
      ]);

      versionsService.setSource("1");

      assert.deepEqual(versionsService.targets, ["3", "2"]);

      versionsService.setTarget("2");

      assert.strictEqual(versionsService.target, "2");

      versionsService.setTarget("3");

      assert.strictEqual(versionsService.target, "3");
    });

    test("throws an error when given an unrecognized target version", function (assert) {
      const versionsService = getVersionsService(this, [
        new Version("3"),
        new Version("2"),
        new Version("1"),
      ]);

      assert.throws(() => {
        versionsService.setTarget("bad");
      }, "Given target version is unrecognized");
    });
  });

  module("source", function () {
    test("defaults to the second latest version", function (assert) {
      const versionsService = getVersionsService(this, [
        new Version("3"),
        new Version("2"),
        new Version("1"),
      ]);

      assert.strictEqual(versionsService.source, "2");
    });
  });

  module("sources", function () {
    test("includes all versions up to the most recent version", function (assert) {
      const versionsService = getVersionsService(this, [
        new Version("3"),
        new Version("2"),
        new Version("1"),
      ]);

      assert.strictEqual(versionsService.target, "3");
      assert.strictEqual(versionsService.source, "2");
      assert.deepEqual(versionsService.sources, ["2", "1"]);

      versionsService.setSource("1");
      versionsService.setTarget("2");

      assert.deepEqual(versionsService.sources, ["2", "1"]);
    });
  });

  module("target", function () {
    test("defaults to the latest version", function (assert) {
      const versionsService = getVersionsService(this, [
        new Version("3"),
        new Version("2"),
        new Version("1"),
      ]);

      assert.strictEqual(versionsService.target, "3");
    });
  });

  module("targets", function () {
    test("includes all known versions after the selected source version", function (assert) {
      const versionsService = getVersionsService(this, [
        new Version("3"),
        new Version("2"),
        new Version("1"),
      ]);

      assert.strictEqual(versionsService.source, "2");
      assert.deepEqual(versionsService.targets, ["3"]);

      versionsService.setSource("1");

      assert.deepEqual(versionsService.targets, ["3", "2"]);
    });
  });
});
