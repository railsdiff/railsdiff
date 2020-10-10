import Route from "@ember/routing/route";
import Ember from "ember";

declare global {
  interface Array<T> extends Ember.ArrayPrototypeExtensions<T> {}
  // interface Function extends Ember.FunctionPrototypeExtensions {}
}

type FirstArgument<F> = F extends (arg: infer A) => any ? A : never;

// Transition is defined here because the @types/ember Transition is currently
// defined as a private type. See
// https://github.com/typed-ember/ember-cli-typescript/issues/790.
export type Transition = FirstArgument<Route["beforeModel"]>;

export {};
