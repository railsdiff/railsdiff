import { currentURL, visit } from "@ember/test-helpers";
import { module, test } from "qunit";

import { setupApplicationTest } from "../helpers";

module("Acceptance | tag request failure", (hooks) => {
  setupApplicationTest(hooks);

  test("describes the application", async function (assert) {
    await visit("/");

    assert.strictEqual(currentURL(), "/");
    assert.dom(".content").containsText("There was a problem");
  });
});
