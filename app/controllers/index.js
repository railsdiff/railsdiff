import Controller from 'ember-controller';
import injectController from 'ember-controller/inject';
import { reads } from 'ember-computed';

export default Controller.extend({
  actions: {
    sourceDidChange() {
      this.get('application').send('sourceDidChange', ...arguments);
    },
    targetDidChange() {
      this.get('application').send('targetDidChange', ...arguments);
    },
    transition: function() {
      this.get('application').send('transition');
    }
  },
  application: injectController(),
  showForm: reads('application.showForm'),
  sourceVersion: reads('application.sourceVersion'),
  sources: reads('application.sources'),
  targetVersion: reads('application.targetVersion'),
  targets: reads('application.targets'),
});
