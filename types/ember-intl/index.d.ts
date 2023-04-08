import type Intl from 'ember-intl/services/intl';

declare module '@ember/service' {
  interface Registry {
    intl: Intl;
  }
}
