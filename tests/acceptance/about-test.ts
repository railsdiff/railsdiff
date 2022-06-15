import { currentURL, visit } from "@ember/test-helpers";
import { click } from "ember-semantic-test-helpers/test-support";
import { module, test } from "qunit";

import sample from "../../mirage/scenarios/sample";
import { setupAcceptanceTest } from "../helpers";

module("Acceptance | about", (hooks) => {
  setupAcceptanceTest(hooks);

  hooks.beforeEach(() => {
    sample(server);
  });

  test("describes the application", async function (assert) {
    await visit("/");
    await click("About");

    assert.equal(currentURL(), "/about");
    assert.dom(".content").containsText("Why RailsDiff was built");
  });
});
