// Type definitions for ember-semantic-test-helpers 0.2.1
// Project: https://github.com/tradegecko/ember-semantic-test-helpers
// Definitions by: Dray Lacy <https://github.com/omghax>

declare module "ember-semantic-test-helpers/test-support/actors/fillIn" {
  export default function fillIn(label: string, value: string): Promise<void>;
}

declare module "ember-semantic-test-helpers/test-support/actors/select" {
  export default function select(
    label: string,
    value: number | string
  ): Promise<void>;
}

declare module "ember-semantic-test-helpers/test-support/actors/toggle" {
  export default function toggle(label: string): Promise<void>;
}

declare module "ember-semantic-test-helpers/test-support/actors/click" {
  export default function click(label: string): Promise<void>;
}

declare module "ember-semantic-test-helpers/test-support/config" {
  export { config as default } from "semantic-dom-selectors";
}

declare module "ember-semantic-test-helpers/test-support/notify" {
  export { notify as default } from "semantic-dom-selectors";
}

declare module "ember-semantic-test-helpers/test-support/find-helpers" {
  export {
    findButton,
    findButtons,
    findControl,
    findControls,
    findObject,
    findObjects,
  } from "semantic-dom-selectors";
}

declare module "ember-semantic-test-helpers/test-support" {
  /* eslint-disable ember/no-test-support-import */
  import click from "ember-semantic-test-helpers/test-support/actors/click";
  import fillIn from "ember-semantic-test-helpers/test-support/actors/fillIn";
  import select from "ember-semantic-test-helpers/test-support/actors/select";
  import toggle from "ember-semantic-test-helpers/test-support/actors/toggle";
  import config from "ember-semantic-test-helpers/test-support/config";
  import {
    findButton,
    findControl,
  } from "ember-semantic-test-helpers/test-support/find-helpers";

  export { fillIn, select, toggle, click, findButton, findControl, config };
}
