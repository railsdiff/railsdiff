import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    transition: function() {
      this.get('controllers.application').send('transition');
    }
  },
  needs: ['application'],
  showForm: Ember.computed.alias('controllers.application.showForm'),
  sourceVersion: Ember.computed.alias('controllers.application.sourceVersion'),
  sources: Ember.computed.alias('controllers.application.sources'),
  targetVersion: Ember.computed.alias('controllers.application.targetVersion'),
  targets: Ember.computed.alias('controllers.application.targets'),
});
