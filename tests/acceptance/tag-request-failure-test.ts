import { currentURL, visit } from "@ember/test-helpers";
import { module, test } from "qunit";

import { setupAcceptanceTest } from "../helpers";

module("Acceptance | tag request failure", (hooks) => {
  setupAcceptanceTest(hooks);

  test("describes the application", async (assert) => {
    await visit("/");

    assert.equal(currentURL(), "/");
    assert.dom(".content").containsText("There was a problem");
  });
});
