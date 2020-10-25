import { click as clickSelector, visit } from "@ember/test-helpers";
import { findControl, select } from "ember-semantic-test-helpers/test-support";
import { findButtons } from "ember-semantic-test-helpers/test-support/find-helpers";
import { module, test } from "qunit";

import sample from "../../mirage/scenarios/sample";
import { setupAcceptanceTest } from "../helpers";

async function viewDiff() {
  // With two "View Diff" buttons on the page, a simple click("View Diff") throws an error (rightly so).
  const submit = findButtons("View Diff")[0];
  await clickSelector(submit);
}

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
    await visit("/");
    await select("Source", "1.0.0");
    await select("Target", "2.0.0");
    await viewDiff();

    assert.dom(".content").containsText(".travis.yml");
  });

  test("links to source and target file locations", async (assert) => {
    await visit("/");
    await select("Source", "1.0.0");
    await select("Target", "2.0.0");
    await viewDiff();

    assert
      .dom("a[title='View .travis.yml at 1.0.0']")
      .hasProperty(
        "href",
        new RegExp("/railsdiff/generated/blob/v1.0.0/.travis.yml"),
        "Links to first source file"
      );
    assert
      .dom("a[title='View .travis.yml at 2.0.0']")
      .hasProperty(
        "href",
        new RegExp("/railsdiff/generated/blob/v2.0.0/.travis.yml"),
        "Links to first target file"
      );
    assert
      .dom("a[title='View LICENSE.txt at 1.0.0']")
      .hasProperty(
        "href",
        new RegExp("/railsdiff/generated/blob/v1.0.0/LICENSE.txt"),
        "Links to second source file"
      );
    assert
      .dom("a[title='View LICENSE.txt at 2.0.0']")
      .hasProperty(
        "href",
        new RegExp("/railsdiff/generated/blob/v2.0.0/LICENSE.txt"),
        "Links to second target file"
      );
  });
});
