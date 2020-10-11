import { getContext as _getContext } from "@ember/test-helpers";
import setupMirage from "ember-cli-mirage/test-support/setup-mirage";
import { setupApplicationTest } from "ember-qunit";

export function setupAcceptanceTest(hooks: NestedHooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
}
