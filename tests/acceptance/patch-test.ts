import { visit } from "@ember/test-helpers";
import { findControl } from "ember-semantic-test-helpers/test-support";
import { module, test } from "qunit";

import sample from "../../mirage/scenarios/sample";
import { setupAcceptanceTest } from "../helpers";

module("Acceptance | patch", (hooks) => {
  setupAcceptanceTest(hooks);

  hooks.beforeEach(() => {
    sample(server);
  });

  test("navigating directly to a patch sets the selected versions", async (assert) => {
    await visit("/1.0.1/1.1.1");

    const sourceControl = findControl("Source") as HTMLSelectElement;
    const sourceSelected = [...sourceControl.options].objectAt(
      sourceControl.selectedIndex
    )?.label;
    const targetControl = findControl("Target") as HTMLSelectElement;
    const targetSelected = [...targetControl.options].objectAt(
      targetControl.selectedIndex
    )?.label;

    assert.equal(sourceSelected, "1.0.1");
    assert.equal(targetSelected, "1.1.1");
  });

  test("navigating directly to a patch with unknown versions errors", async (assert) => {
    await visit("/1.0.1/2.1.1");

    assert.dom(".content").containsText("There was a problem");

    await visit("/2.0.1/1.1.1");

    assert.dom(".content").containsText("There was a problem");

    await visit("/2.0.1/2.1.1");

    assert.dom(".content").containsText("There was a problem");
  });

  test("displays the diff between the source and target versions", async (assert) => {
    await visit("/1.0.0/2.0.0");
    assert.dom(".content").containsText("rubygems.org");
  });
});
