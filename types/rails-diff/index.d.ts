import '@glint/environment-ember-loose';
import Helper from '@ember/component/helper';
import type RouterService from '@ember/routing/router-service';
import { ComponentLike } from '@glint/template/-private';
import Ember from 'ember';
import TranslationHelper from 'ember-intl/helpers/t';

declare global {
  interface Array<T> extends Ember.ArrayPrototypeExtensions<T> {}
  // interface Function extends Ember.FunctionPrototypeExtensions {}
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    // ember-ally-refocus
    NavigationNarrator: ComponentLike<{
      Args: {
        Named: {
          navigationText?: string;
          routeChangeValidator?: (transition: Transition) => boolean;
          skipLink?: boolean;
          skipText?: string;
          skipTo?: string;
        };
      };
    }>;

    // ember-page-title
    'page-title': new () => Helper<{
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
export type Transition = ReturnType<RouterService['transitionTo']>;

export {};
