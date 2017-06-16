import Ember from 'ember';
import ControllerMessaging from '../mixins/controller-messaging';

export default Ember.Controller.extend(ControllerMessaging, {
  actions: {
    sourceDidChange(value) {
      this.set('sourceVersion', value);
    },
    targetDidChange(value) {
      this.set('targetVersion', value);
    },
    transition() {
      this.transitionToRoute('patch', this.get('sourceVersion'), this.get('targetVersion'));
    },
  },
  showForm: Ember.computed.bool('versions.length'),
  sourceVersion: Ember.computed.oneWay('sources.firstObject'),
  sources: Ember.computed('versions', function() {
    return this.get('versions').slice(1);
  }),
  versions: Ember.computed.mapBy('model', 'version'),
  targetValidator: function() {
    var targets = this.get('targets');

    if (!targets.includes(this.get('targetVersion'))) {
      this.set('targetVersion', targets.get('lastObject'));
    }
  }.observes('targets'),
  targetVersion: Ember.computed.oneWay('targets.firstObject'),
  targets: Ember.computed('versions', 'sourceVersion', function() {
    var versions = this.get('versions'),
        sourceVersion = this.get('sourceVersion'),
        sourceIndex = versions.indexOf(sourceVersion);
    if (!sourceVersion) { return []; }
    return versions.slice(0, sourceIndex);
  }),
});
