import RSVP from 'rsvp';
import destroyApp from '../helpers/destroy-app';
import startApp from '../helpers/start-app';
import { module } from 'qunit';

const { Promise } = RSVP;

export default function(name, options = {}) {
  module(name, {
    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return Promise.resolve(afterEach).then(() => destroyApp(this.application));
    },
    beforeEach() {
      this.application = startApp();

      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },
  });
}
