import { click as clickSelector, visit } from "@ember/test-helpers";
import { findControl, select } from "ember-semantic-test-helpers/test-support";
import { findButtons } from "ember-semantic-test-helpers/test-support/find-helpers";
import { module, test } from "qunit";
import config from "rails-diff/config/environment";

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

  test("navigating directly to a patch sets the selected versions", async function (assert) {
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

  test("navigating directly to a patch with unknown versions errors", async function (assert) {
    await visit("/1.0.1/2.1.1");

    assert.dom(".content").containsText("There was a problem");

    await visit("/2.0.1/1.1.1");

    assert.dom(".content").containsText("There was a problem");

    await visit("/2.0.1/2.1.1");

    assert.dom(".content").containsText("There was a problem");
  });

  test("deep links to each file diff", async function (assert) {
    await visit("/");
    await select("Source", "1.0.0");
    await select("Target", "1.0.1");
    await viewDiff();

    assert
      .dom("a[title='Permalink to Gemfile']")
      .hasAttribute("href", "#diff-de3150c01c3a946a6168173c4116741379fe3579");
  });

  test("displays the diff between the source and target versions for an added file", async function (assert) {
    await visit("/");
    await select("Source", "1.0.0");
    await select("Target", "1.0.1");
    await viewDiff();

    assert.dom(".content").containsText("Gemfile");
  });

  test("links only to the target file location for an added file", async function (assert) {
    await visit("/");
    await select("Source", "1.0.0");
    await select("Target", "1.0.1");
    await viewDiff();

    assert.dom("a[title='View Gemfile at 1.0.0']").doesNotExist();
    assert
      .dom("a[title='View Gemfile at 1.0.1']")
      .hasProperty(
        "href",
        new RegExp(`/${config.APP.REPOSITORY}/blob/v1.0.1/Gemfile`),
        "Links to target file"
      );
  });

  test("displays the diff between the source and target versions for a modified file", async function (assert) {
    await visit("/");
    await select("Source", "1.0.1");
    await select("Target", "1.1.1");
    await viewDiff();

    assert.dom(".content").containsText("Gemfile");
  });

  test("links to source and target file locations for a modified file", async function (assert) {
    await visit("/");
    await select("Source", "1.0.1");
    await select("Target", "1.1.1");
    await viewDiff();

    assert
      .dom("a[title='View Gemfile at 1.0.1']")
      .hasProperty(
        "href",
        new RegExp(`/${config.APP.REPOSITORY}/blob/v1.0.1/Gemfile`),
        "Links to source file"
      );
    assert
      .dom("a[title='View Gemfile at 1.1.1']")
      .hasProperty(
        "href",
        new RegExp(`/${config.APP.REPOSITORY}/blob/v1.1.1/Gemfile`),
        "Links to target file"
      );
  });

  test("displays the diff between the source and target versions for a removed file", async function (assert) {
    await visit("/");
    await select("Source", "1.1.1");
    await select("Target", "2.0.0");
    await viewDiff();

    assert.dom(".content").containsText("Gemfile");
  });

  test("links only to the source file location for a removed file", async function (assert) {
    await visit("/");
    await select("Source", "1.1.1");
    await select("Target", "2.0.0");
    await viewDiff();

    assert
      .dom("a[title='View Gemfile at 1.1.1']")
      .hasProperty(
        "href",
        new RegExp(`/${config.APP.REPOSITORY}/blob/v1.1.1/Gemfile`),
        "Links to source file"
      );
    assert.dom("a[title='View Gemfile at 2.0.0']").doesNotExist();
  });
});
