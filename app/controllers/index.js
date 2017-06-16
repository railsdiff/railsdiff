import Ember from 'ember';

export default Ember.Controller.extend({
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
  application: Ember.inject.controller(),
  showForm: Ember.computed.alias('application.showForm'),
  sourceVersion: Ember.computed.alias('application.sourceVersion'),
  sources: Ember.computed.alias('application.sources'),
  targetVersion: Ember.computed.alias('application.targetVersion'),
  targets: Ember.computed.alias('application.targets'),
});
