import "@glint/environment-ember-loose";
import Helper from "@ember/component/helper";
import type RouterService from "@ember/routing/router-service";
import TranslationHelper from "@gavant/glint-template-types/types/ember-intl/translation-helper";
import Ember from "ember";

declare global {
  interface Array<T> extends Ember.ArrayPrototypeExtensions<T> {}
  // interface Function extends Ember.FunctionPrototypeExtensions {}
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    // ember-page-title
    "page-title": new () => Helper<{
      Args: {
        Named: {
          prepend?: boolean;
          separator?: string;
        };
        Positional: [string];
      };
      Return: void;
    }>;

    t: typeof TranslationHelper;
  }
}

// Transition is defined here because the @types/ember Transition is currently
// defined as a private type. See
// https://github.com/typed-ember/ember-cli-typescript/issues/790.
export type Transition = ReturnType<RouterService["transitionTo"]>;

export {};
