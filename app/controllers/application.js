import Ember from 'ember';
import ControllerMessaging from '../mixins/controller-messaging';

export default Ember.Controller.extend(ControllerMessaging, {
  actions: {
    transition: function() {
      this.transitionToRoute('patch', this.get('sourceVersion'), this.get('targetVersion'));
    }
  },
  showForm: Ember.computed.and('versions.length'),
  sourceVersion: Ember.computed.oneWay('versions.[].1'),
  sources: Ember.computed.alias('versions'),
  versions: Ember.computed('model', function() {
    return this.get('model').split('\n').reverse();
  }),
  targetValidator: function() {
    var targets = this.get('targets');

    if (!targets.contains(this.get('targetVersion'))) {
      this.set('targetVersion', targets[targets.length - 1]);
    }
  }.observes('targets'),
  targetVersion: Ember.computed.oneWay('targets.firstObject'),
  targets: Ember.computed('versions', 'sourceVersion', function() {
    var versions = this.get('versions'),
        sourceVersion = this.get('sourceVersion'),
        sourceIndex = versions.indexOf(sourceVersion);
    if (!sourceVersion) { return []; }
    return versions.slice(0, sourceIndex);
  })
});
