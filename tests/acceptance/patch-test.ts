import { click as clickSelector, currentURL, visit } from "@ember/test-helpers";
import { findControl, select } from "ember-semantic-test-helpers/test-support";
import { findButtons } from "ember-semantic-test-helpers/test-support/find-helpers";
import { module, test } from "qunit";
import { REPOSITORY } from "rails-diff/utils/environment";

import sample from "../../mirage/scenarios/sample";
import { setupApplicationTest } from "../helpers";

async function viewDiff() {
  // With two "View Diff" buttons on the page, a simple click("View Diff") throws an error (rightly so).
  const submit = findButtons("View Diff")[0];
  await clickSelector(submit);
}

module("Acceptance | patch", (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(() => {
    sample(server);
  });

  test("navigating directly to a patch sets the selected versions", async function (assert) {
    await visit("/1.0.1/1.1.1");

    const sourceControl = findControl("Source") as HTMLSelectElement;
    const sourceSelected = [...sourceControl.options][
      sourceControl.selectedIndex
    ]?.label;
    const targetControl = findControl("Target") as HTMLSelectElement;
    const targetSelected = [...targetControl.options][
      targetControl.selectedIndex
    ]?.label;

    assert.strictEqual(sourceSelected, "1.0.1");
    assert.strictEqual(targetSelected, "1.1.1");
  });

  test("navigating directly to a patch with unknown versions redirects", async function (assert) {
    try {
      // The `visit` helper raises a `TransitionAborted` when routing is interrupted
      // See https://github.com/emberjs/ember-test-helpers/issues/332.
      await visit("/1.0.1/2.1.1");
    } catch (e) {
      console.debug(e);
    }

    assert.strictEqual(currentURL(), "/");

    try {
      // The `visit` helper raises a `TransitionAborted` when routing is interrupted
      // See https://github.com/emberjs/ember-test-helpers/issues/332.
      await visit("/2.0.1/1.1.1");
    } catch (e) {
      console.debug(e);
    }

    assert
      .dom(".content")
      .containsText("What version of Rails are you currently using?");

    try {
      // The `visit` helper raises a `TransitionAborted` when routing is interrupted
      // See https://github.com/emberjs/ember-test-helpers/issues/332.
      await visit("/2.0.1/2.1.1");
    } catch (e) {
      console.debug(e);
    }

    assert
      .dom(".content")
      .containsText("What version of Rails are you currently using?");
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

  test("displays the count of changed files between the source and target versions", async function (assert) {
    await visit("/");
    await select("Source", "1.0.0");
    await select("Target", "1.0.1");
    await viewDiff();

    assert.dom(".content").containsText("Showing 1 changed file.");

    await select("Source", "1.0.0");
    await select("Target", "1.1.1");
    await viewDiff();

    assert.dom(".content").containsText("Showing 2 changed files.");
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
        new RegExp(`/${REPOSITORY}/blob/v1.0.1/Gemfile`),
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
        new RegExp(`/${REPOSITORY}/blob/v1.0.1/Gemfile`),
        "Links to source file"
      );
    assert
      .dom("a[title='View Gemfile at 1.1.1']")
      .hasProperty(
        "href",
        new RegExp(`/${REPOSITORY}/blob/v1.1.1/Gemfile`),
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
        new RegExp(`/${REPOSITORY}/blob/v1.1.1/Gemfile`),
        "Links to source file"
      );
    assert.dom("a[title='View Gemfile at 2.0.0']").doesNotExist();
  });

  test("links to the full rails new output for selected versions", async function (assert) {
    await visit("/");
    await select("Source", "1.1.1");
    await select("Target", "2.0.0");
    await viewDiff();

    assert
      .dom("a[title='View rails new output of 1.1.1']")
      .hasProperty(
        "href",
        new RegExp(`https://github.com/${REPOSITORY}/tree/v1.1.1`),
        "Links to source rails new output"
      );
    assert
      .dom("a[title='View rails new output of 2.0.0']")
      .hasProperty(
        "href",
        new RegExp(`https://github.com/${REPOSITORY}/tree/v2.0.0`),
        "Links to target rails new output"
      );
  });
});
